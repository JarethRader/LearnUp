import React from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../reducers/index';

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.user.isAuthenticated,
  userInfo: state.user.userInfo,
  userLoading: state.user.userLoading,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;
const Home = (props: Props) => {
  return (
    <div>
      <p>name: {props.userInfo && props.userInfo.username}</p>
      <p>email: {props.userInfo && props.userInfo.email}</p>
    </div>
  );
};

export default connector(Home);
