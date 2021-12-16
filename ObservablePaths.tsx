// Context for all app's pages
import React from 'react';
import {Paths} from './stores/paths';
import {Markers} from './stores/markers';

const marker = new Markers();
export const paths = new Paths();
export const ObservablePaths = React.createContext(paths);
export const ObservableMarkers = React.createContext(marker);
