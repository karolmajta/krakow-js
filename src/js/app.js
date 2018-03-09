import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Remote } from './remote';
import { Catalogue } from './view/Catalogue';

const remote = new Remote(window);

ReactDOM.render(<Catalogue remote={remote} />, document.getElementById('application-container'));