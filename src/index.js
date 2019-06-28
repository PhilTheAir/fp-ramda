import { 
  input, 
  output 
} from './__fixtures__/mocks';
import {
  transforms
} from './utils';

const result = transforms(
  input,
  "link1",
  "link2"
);

console.log(result === output, result);