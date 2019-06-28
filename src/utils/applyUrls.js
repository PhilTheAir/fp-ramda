import {
  assoc,
  compose,
  map,
  equals
} from 'ramda';
import {
  m2, m3
} from '.';

const assignPcpUrl = pcpUrl => item =>
  equals(item.type, m3) ? assoc('url', pcpUrl, item) : item;

const assignPcUrl = pcUrl => item =>
  equals(item.type, m2) ? assoc('url', pcUrl, item) : item;

export const applyUrls = (pcUrl, pcpUrl) =>
  map(
    compose(
      assignPcpUrl(pcpUrl),
      assignPcUrl(pcUrl)
    )
  );