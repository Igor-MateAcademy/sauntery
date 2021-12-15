// Context for all app's pages
import React from 'react';
import {Paths} from './stores/paths';

export const paths = new Paths();
export const ObservablePaths = React.createContext(paths);
