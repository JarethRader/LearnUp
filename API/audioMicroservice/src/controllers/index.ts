import { generateAudio } from '../use-cases';
import buildGetAudio from './get-audio';

const getAudio = buildGetAudio(generateAudio);

const audioController = {
    getAudio
}

export default audioController;
export {
    getAudio
}