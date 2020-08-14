import React, { useState, Fragment, useRef } from 'react';

import { faChevronSquareDown, faDotCircle, faCheckSquare, faChevronCircleUp, faHandPointer, 
  faEllipsisV, faPercentage, faBug, faTable, faShapes, faSpinner, faHistory, faMap, faWindow, 
  faFileImport, faFolder, faFileSignature, faCommentAltLines, faBallotCheck, faCommentDots, faClock, faFileUpload, faAlignJustify, faSlidersH, faToggleOn, faDiceOne, faPlus, faDiceTwo, faExternalLink } from '@fortawesome/pro-light-svg-icons';

import { faChevronSquareDown as faChevronSquareDownSolid, faDotCircle as faDotCircleSolid,
  faCheckSquare as faCheckSquareSolid, faChevronCircleUp as faChevronCircleUpSolid,
  faHandPointer as faHandPointerSolid, faEllipsisV as faEllipsisVSolid, faPercentage as faPercentageSolid,
  faBug as faBugSolid, faTable as faTableSolid, faShapes as faShapesSolid, faSpinner as faSpinnerSolid,
  faHistory as faHistorySolid, faMap as faMapSolid, faWindow as faWindowSolid, faFileImport as faFileImportSolid,
  faFolder as faFolderSolid, faFileSignature as faFileSignatureSolid, faCommentAltLines as faCommentAltLinesSolid,
  faBallotCheck as faBallotCheckSolid, faCommentDots as faCommentDotsSolid, faICursor,
  faClock as faClockSolid, faICursor as faICursorSolid, faFileUpload as faFileUploadSolid,
  faAlignJustify as faAlignJustifySolid, faSlidersH as faSlidersHSolid, faToggleOn as faToggleOnSolid, faCheck, faTimes, faEnvelope, faImage } from '@fortawesome/pro-solid-svg-icons';

import Accordion from './../../../Utils/Accordion/Accordion';
import ActionButton from './../../../Utils/ActionButton/ActionButton';
import ActionLink from './../../../Utils/ActionLink/ActionLink';
import ActionList from './../../../Utils/ActionList/ActionList';
import Checkbox from './../../../Utils/FormElements/Checkbox/Checkbox';
import Choose from './../../../Utils/FormElements/Choose/Choose';
import Code from './../../../Utils/Code/Code';
import CompletionBar from './../../../Utils/CompletionBar/CompletionBar';
import Debug from './../../../Utils/Debug/Debug';
import ExTable, { EXTABLE_VIEWS } from './../../../Utils/ExTable/ExTable';
import FormAutoSuggestInput from './../../../Utils/FormElements/FormAutoSuggestInput/FormAutoSuggestInput';
import FormDebounceAutoSuggestInput from './../../../Utils/FormElements/FormDebounceAutoSuggestInput/FormDebounceAutoSuggestInput';
import FormDebounceInput from './../../../Utils/FormElements/FormDebounceInput/FormDebounceInput';
import FormInput from './../../../Utils/FormElements/FormInput/FormInput';
import FormInputFile from './../../../Utils/FormElements/FormInputFile/FormInputFile';
import FormTextarea from './../../../Utils/FormElements/FormTextarea/FormTextarea';
import Icon, { CUSTOM_ICONS } from './../../../Utils/Icon/Icon';
import Loader from './../../../Utils/Loader/Loader';
import Map from './../../../Utils/Map/Map';
import ModalService from './../../../../services/modal.service';
import PageLink, { PageLinkType } from './../../../Utils/PageLink/PageLink';
import Radio from './../../../Utils/FormElements/Radio/Radio';
import Range from './../../../Utils/FormElements/Range/Range';
import Switch from './../../../Utils/FormElements/Switch/Switch';
import Tabs from './../../../Utils/Tabs/Tabs';
import Tooltip from './../../../Utils/Tooltip/Tooltip';

import DateService from './../../../../services/date.service';
import UserAgentService from './../../../../services/useragent.service';
import UtilsService from './../../../../services/utils.service';

import dotImg from './../../../../assets/dot.png';
import LogTrackTimeline from '../../../Utils/LogTrackTimeline/LogTrackTimeline';

import { ELogTrackActivity } from './../../../../classes/LogTrack';

const DevDocComponentsTab = () => {

  const [booleanValue, setBooleanValue] = useState(true);

  const [stringValue, setStringValue] = useState('value1');

  const [fileValue, setFileValue] = useState(null);
  const [imageFileValue, setImageFileValue] = useState(null);

  const [formStringValue, setFormStringValue] = useState('value');
  const [possibleItems, setPossibleItems] = useState({});
  const [selectedItemKey, setSelectedItemKey] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const [tooltipHover, setTooltipHover] = useState(false);

  const [numValue, setNumValue] = useState(50);

  const [selectionValue, setSelectionValue] = useState([]);

  const mapRef = useRef();

  const computeLogTracks = () => {
    const currDate = DateService.getCurrentDate();

    const currDateM3H = DateService.cloneDate(currDate);
    currDateM3H.setHours(currDateM3H.getHours() - 3);

    const currDateM6H = DateService.cloneDate(currDate);
    currDateM6H.setHours(currDateM6H.getHours() - 6);

    const currDateM2D = DateService.addOrRemoveDays(currDate, -2);

    return {
      lt1: {
        startIsoDate: DateService.getIsoDateString(currDateM2D),
        startTimestamp: DateService.getTimeStampNumber(currDateM2D),
        activity: ELogTrackActivity.ABSENT,
        endIsoDate: DateService.getIsoDateString(currDateM6H),
        endTimestamp: DateService.getTimeStampNumber(currDateM6H),
        employeeId: -1,
        companyId: -1
      },
      lt2: {
        startIsoDate: DateService.getIsoDateString(currDateM6H),
        startTimestamp: DateService.getTimeStampNumber(currDateM6H),
        activity: ELogTrackActivity.TRANSIT,
        employeeId: -1,
        companyId: -1
      },
      lt3: {
        startIsoDate: DateService.getIsoDateString(currDateM3H),
        startTimestamp: DateService.getTimeStampNumber(currDateM3H),
        isPunctual: true,
        activity: ELogTrackActivity.REFUELING,
        endIsoDate: DateService.getIsoDateString(currDateM3H),
        endTimestamp: DateService.getTimeStampNumber(currDateM3H),
        employeeId: -1,
        companyId: -1
      }
    };
  };

  return <div className="DevDocComponentsTab">
    <Tabs isHorizontalLayout tabs={{

      accordion: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faChevronSquareDownSolid : faChevronSquareDown} />
          <span>Accordion</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faChevronSquareDownSolid} /> Accordion</h1>
          <span className="doc-desc">Accordion is a component that prints all item titles. When an item's title is clicked, its details are shown. Only one item's details can be shown at a time.</span>
          <ul className="doc-tags">
            <li>Accordion</li>
            <li>Collapsible Group</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr>
                <td>items
                  <span className="doc-t">
                    {'{'}<br/>
                    <span className="doc-t">
                      id: {'{'}<br/>
                        <span className="doc-t">
                          name: {'({ isActive }) => '} Title,<br/>
                          content: {'() => '} Content,<br/>
                          disabled: false
                        </span>
                      {'}'}
                    </span><br/>
                    {'}'}
                  </span>
                </td>
                <td><Icon source="fa" icon={faCheck} /></td>
                <td>Items to be printed:<br/>
                  id: Unique identifier of the tab<br/>
                  name: function that prints the tab's title. isActive permits to modify its content according to its status.<br/>
                  content: function that prints the tab's content<br/>
                  disabled: boolean that indicates if the tab should be disabled (default false)
                </td></tr>
              <tr><td>default</td><td><Icon source="fa" icon={faTimes} /></td><td>Id of the item that should be opened by default</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Basic Example</h3>
            <div className="doc-example-exec">
              <Accordion items={{
                id1: {
                  name: () => 'Tab 1',
                  content: () => <span>Content 1</span>
                },
                id2: {
                  name: () => 'Tab 2',
                  content: () => <span>Content 2</span>
                }
              }} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Accordion
  items={{
    id1: {
      name: () => 'Tab 1',
      content: () => <span>Content 1</span>
    },
    id2: {
      name: () => 'Tab 2',
      content: () => <span>Content 2</span>
    }
  }} />`} />
            </div>
          </div>
          <div className="doc-example">
            <h3>Complete Example</h3>
            <div className="doc-example-exec">
              <Accordion default="id1" items={{
                id1: {
                  name: () => 'Tab 1 (Active by default)',
                  content: () => <span>Content 1</span>
                },
                id2: {
                  name: ({ isActive }) => <span>Tab 2 {isActive ? <b>Active</b> : <b>Unactive</b>}</span>,
                  content: () => <span>Content 2</span>
                },
                id3: {
                  name: () => 'Tab 3 (Disabled)',
                  disabled: true,
                  content: () => <span>Content 3</span>
                }
              }} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Accordion
  default="id1"
  items={{
    id1: {
      name: () => 'Tab 1 (Active by default)',
      content: () => <span>Content 1</span>
    },
    id2: {
      name: ({ isActive }) => <span>Tab 2 {isActive ? <b>Active</b> : <b>Unactive</b>}</span>,
      content: () => <span>Content 2</span>
    },
    id3: {
      name: () => 'Tab 3 (Disabled)',
      disabled: true,
      content: () => <span>Content 3</span>
    }
  }} />`} />
            </div>
            <span className="doc-example-desc">
              Passing an item id to the 'default' prop will make it open by default.<br/>
              Via the 'isActive' parameter of the name function, you can modify item's title according to its status.<br/>
              You can assign true to the 'disabled' prop of an item to disable its interaction.
            </span>
          </div>
        </div>
      },

      actionButton: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faChevronCircleUpSolid : faChevronCircleUp} />
          <span>Action Button</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faChevronCircleUpSolid} /> Action Button</h1>
          <span className="doc-desc">Button that displays a list of actions when toggled. Similar to a Float Button.</span>
          <ul className="doc-tags">
            <li>Action Button</li>
            <li>Float Button</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr>
                <td>actions
                  <span className="doc-t">
                    {'['}<br/>
                    <span className="doc-t">
                      {'{'}<br/>
                        <span className="doc-t">
                          title: Title,<br/>
                          icon: Icon,<br/>
                          link: React Link,<br/>
                          pureLink: HTML Link,<br/>
                          callback: {'() => ...'}
                        </span>
                      {'}'}
                    </span><br/>
                    {']'}
                  </span>
                </td>
                <td><Icon source="fa" icon={faCheck} /></td>
                <td>Actions to be printed:<br/>
                  title: label of the action,<br/>
                  icon: icon of the action ({`<Icon />`} component),<br/>
                  <b>One and only one of the following:</b><br/>
                  link: the 'to' link to another registered route path,<br/>
                  pureLink: external link,<br/>
                  callback: function to be called
                </td></tr>
              <tr><td>icon</td><td><Icon source="fa" icon={faCheck} /></td><td>Icon of the main button.<br/>It is recommended to use the faPlus icon for coherence.</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Example</h3>
            <div className="doc-example-exec">
              <ActionButton style={{ position: 'absolute' }} icon={<Icon source="fa" icon={faPlus} /> } actions={[
                { title: 'Action 1', icon: <Icon source="fa" icon={faDiceOne} />, callback: () => alert('Action 1 clicked!') },
                { title: 'Action 2', icon: <Icon source="fa" icon={faDiceTwo} />, callback: () => alert('Action 2 clicked!') },
                { title: 'Go to Google!', icon: <Icon source="fa" icon={faExternalLink} />, pureLink: 'https://google.com' }
              ]} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<ActionButton
  icon={<Icon source="fa" icon={faPlus} /> }
  actions={[
    { title: 'Action 1', icon: <Icon source="fa" icon={faDiceOne} />, callback: () => alert('Action 1 clicked!') },
    { title: 'Action 2', icon: <Icon source="fa" icon={faDiceTwo} />, callback: () => alert('Action 2 clicked!') },
    { title: 'Go to Google!', icon: <Icon source="fa" icon={faExternalLink} />, pureLink: 'https://google.com' }
  ]} />`} />
            </div>
            <span className="doc-example-desc">
              Passing a callback to an action will call it when the action is triggered.<br/>
              Padding a pureLink to an action will open a new tab with the provided address.
            </span>
          </div>
        </div>
      },

      actionLink: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faHandPointerSolid : faHandPointer} />
          <span>Action Link</span>
        </span>,
        content: () => <div>
        <h1><Icon source="fa" icon={faHandPointerSolid} /> Action Link</h1>
        <span className="doc-desc">Link that does not redirect, and only change the URL.<br/>
          This does not trigger the React Router, and was made for this!<br/>Mainly used to pass parameters to other components via URL parameters.</span>
        <ul className="doc-tags">
          <li>Action Link</li>
        </ul>
        <h3>Props</h3>
        <table className="doc-props" border="1">
          <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>content</td><td><Icon source="fa" icon={faCheck} /></td><td>HTML content to print. Don't put interactive components here!</td></tr>
            <tr><td>url</td><td><Icon source="fa" icon={faCheck} /></td><td>URL that will be pushed to history.</td></tr>
            <tr><td>className</td><td><Icon source="fa" icon={faTimes} /></td><td>ClassName to apply on the button.</td></tr>
          </tbody>
        </table>
        <div className="doc-example">
          <h3>Example</h3>
          <div className="doc-example-exec">
            <ActionLink url="/action-link-clicked" content={<span>Click me!</span>} />
          </div>
          <div className="doc-code">
            <span className="doc-code-indicator">JavaScript</span>
            <Code language="jsx" codeSnippet={`<ActionLink
  url="/action-link-clicked"
  content={<span>Click me!</span>} />`} />
          </div>
          <span className="doc-example-desc">
            The URL of this tab will be '/action-link-clicked' once you clicked it.<br/>
            Useful for tabs, that listens to the URL (via UtilsService.url) to change the current tab to a new one.
          </span>
        </div>
      </div>
      },

      actionList: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faEllipsisVSolid: faEllipsisV} />
          <span>Action List</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faEllipsisVSolid} /> Action List</h1>
          <span className="doc-desc">Deployable list of actions.</span>
          <ul className="doc-tags">
            <li>Action List</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr>
                <td>actions
                  <span className="doc-t">
                    {'['}<br/>
                    <span className="doc-t">
                      {'{'}<br/>
                        <span className="doc-t">
                          title: Title,<br/>
                          icon: Icon,<br/>
                          link: React Link,<br/>
                          pureLink: HTML Link,<br/>
                          callback: {'() => ...'}
                        </span>
                      {'}'}
                    </span><br/>
                    {']'}
                  </span>
                </td>
                <td><Icon source="fa" icon={faCheck} /></td>
                <td>Actions to be printed:<br/>
                  title: label of the action,<br/>
                  icon: icon of the action ({`<Icon />`} component),<br/>
                  <b>One and only one of the following:</b><br/>
                  link: the 'to' link to another registered route path,<br/>
                  pureLink: external link,<br/>
                  callback: function to be called
                </td>
              </tr>
              <tr><td>isFlatten</td><td><Icon source="fa" icon={faTimes} /></td><td>Show directly the list of actions, instead of deployable list.</td></tr>
              <tr><td>isHideLabels</td><td><Icon source="fa" icon={faTimes} /></td><td>Hide action labels.</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Basic Example</h3>
            <div className="doc-example-exec">
              <ActionList actions={[
                  { title: 'Action 1', icon: <Icon source="fa" icon={faDiceOne} />, callback: () => alert('Action 1 clicked!') },
                  { title: 'Action 2', icon: <Icon source="fa" icon={faDiceTwo} />, callback: () => alert('Action 2 clicked!') },
                  { title: 'Go to Google!', icon: <Icon source="fa" icon={faExternalLink} />, pureLink: 'https://google.com' }
                ]} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<ActionList actions={[
    { title: 'Action 1', icon: <Icon source="fa" icon={faDiceOne} />, callback: () => alert('Action 1 clicked!') },
    { title: 'Action 2', icon: <Icon source="fa" icon={faDiceTwo} />, callback: () => alert('Action 2 clicked!') },
    { title: 'Go to Google!', icon: <Icon source="fa" icon={faExternalLink} />, pureLink: 'https://google.com' }
  ]} />`} />
            </div>
            <span className="doc-example-desc">
              When clicking the dots, the list of actions appears.
            </span>
          </div>
          <div className="doc-example">
            <h3>Flatten Example</h3>
            <div className="doc-example-exec">
              <ActionList isFlatten actions={[
                  { title: 'Action 1', icon: <Icon source="fa" icon={faDiceOne} />, callback: () => alert('Action 1 clicked!') },
                  { title: 'Action 2', icon: <Icon source="fa" icon={faDiceTwo} />, callback: () => alert('Action 2 clicked!') },
                  { title: 'Go to Google!', icon: <Icon source="fa" icon={faExternalLink} />, pureLink: 'https://google.com' }
                ]} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<ActionList
  isFlatten
  actions={[
    { title: 'Action 1', icon: <Icon source="fa" icon={faDiceOne} />, callback: () => alert('Action 1 clicked!') },
    { title: 'Action 2', icon: <Icon source="fa" icon={faDiceTwo} />, callback: () => alert('Action 2 clicked!') },
    { title: 'Go to Google!', icon: <Icon source="fa" icon={faExternalLink} />, pureLink: 'https://google.com' }
  ]} />`} />
            </div>
            <span className="doc-example-desc">
              When activated, isFlatten permits to directly show the list of actions.
            </span>
          </div>
        </div>
      },

      checkbox: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faCheckSquareSolid: faCheckSquare} />
          <span>Checkbox</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faCheckSquareSolid} /> Checkbox</h1>
          <span className="doc-desc">Checkbox component.</span>
          <ul className="doc-tags">
            <li>Checkbox</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>value</td><td><Icon source="fa" icon={faCheck} /></td><td>Value of the field (true | false)</td></tr>
              <tr><td>fieldName</td><td><Icon source="fa" icon={faTimes} /></td><td>Unique name passed to onValueChange callback to identify the input</td></tr>
              <tr><td>inputName</td><td><Icon source="fa" icon={faTimes} /></td><td>Name of the input</td></tr>
              <tr><td>inputDisabled</td><td><Icon source="fa" icon={faTimes} /></td><td>Tells if the input is disabled or not (default false)</td></tr>
              <tr><td>inputRequired</td><td><Icon source="fa" icon={faTimes} /></td><td>Tells if the input is required (default false)</td></tr>
              <tr><td>label</td><td><Icon source="fa" icon={faTimes} /></td><td>Label of the input (HTML is possible - default is no label)</td></tr>
              <tr><td>onValueChange</td><td><Icon source="fa" icon={faCheck} /></td><td>Callback when value changes: calls with (value, fieldName)</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Example</h3>
            <div className="doc-example-exec">
              <div>Value: {booleanValue.toString()}</div>
              <Checkbox value={booleanValue} label="Click me!" onValueChange={setBooleanValue} />
              <Checkbox value={booleanValue} label="I'm disabled" inputDisabled onValueChange={setBooleanValue} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Checkbox
  value={booleanValue}
  label="Click me!"
  onValueChange={setBooleanValue} />
  <Checkbox
  value={booleanValue}
  label="I'm disabled"
  inputDisabled
  onValueChange={setBooleanValue} />`} />
            </div>
            <span className="doc-example-desc">
              Disable an input via the 'inputDisabled' attribute avoid the user's interaction, but does not forbid you, the dev, to modify its value!
            </span>
          </div>
        </div>
      },

      choose: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faBallotCheckSolid : faBallotCheck} />
          <span>Choose</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faBallotCheckSolid} /> Choose</h1>
          <span className="doc-desc">Choose component. Permits to select one or more items from an item list.</span>
          <ul className="doc-tags">
            <li>Choose</li>
            <li>Selection</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>selection</td><td><Icon source="fa" icon={faCheck} /></td><td>Current selection. Selection is the selected itemKey if multiple is false, or item keys array if multiple is true.</td></tr>
              <tr><td>items
                  <span className="doc-t">
                    {'{'}<br/>
                    <span className="doc-t">
                      itemKey: {'{'}<br/>
                        <span className="doc-t">
                          content: {'() => '} Content,<br/>
                          color: '#555555',<br/>
                          disabled: false
                        </span>
                      {'}'}
                    </span><br/>
                    {'}'}
                  </span>
                </td><td><Icon source="fa" icon={faCheck} /></td><td>Items that can be selected<br/>
                  itemKey: Unique identifier of the item<br/>
                  content: function that prints the item's content<br/>
                  color: Optional - color with which the item will be printed. Use Medium or Dark palette from ColorService is better.<br/>
                  disabled: boolean that indicates if the item should be disabled (default false)</td></tr>
              <tr><td>multiple</td><td><Icon source="fa" icon={faTimes} /></td><td>Tells if selection can contain multiple items (default false)</td></tr>
              <tr><td>isVertical</td><td><Icon source="fa" icon={faTimes} /></td><td>Ask to print one item per line, instead of inline items</td></tr>
              <tr><td>selectionRequired</td><td><Icon source="fa" icon={faTimes} /></td><td>Ask the user to select at least one item (default false)</td></tr>
              <tr><td>onSelectionChange</td><td><Icon source="fa" icon={faCheck} /></td><td>Callback when selection changes: calls with (selection, fieldName)</td></tr>
              <tr><td>fieldName</td><td><Icon source="fa" icon={faTimes} /></td><td>Unique name passed to onValueChange callback to identify the input</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Basic Example</h3>
            <div className="doc-example-exec">
              <div>Value: {stringValue.toString()}</div>
              <Choose items={{ value1: { content: () => 'Item 1' }, value2: { content: () => 'Item 2' } }} selection={stringValue} onSelectionChange={val => setStringValue(val ? val : '')} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Choose
  items={{ value1: { content: () => 'Item 1' }, value2: { content: () => 'Item 2' } }} 
  selection={stringValue} 
  onSelectionChange={val => setStringValue(val ? val : '')} />`} />
            </div>
          </div>
          <div className="doc-example">
            <h3>Complete Example</h3>
            <div className="doc-example-exec">
              <div>Value: {selectionValue.toString()}</div>
              <Choose items={{ value1: { content: () => 'Item 1' }, value2: { content: () => 'Item 2', color: '#4285F4' }, value3: { content: () => 'Item 3' }, disabled: { content: () => 'Disabled', disabled: true } }} isVertical multiple selection={selectionValue} onSelectionChange={setSelectionValue} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Choose
  items={{ value1: { content: () => 'Item 1' }, value2: { content: () => 'Item 2', color: '#4285F4' }, value3: { content: () => 'Item 3' }, disabled: { content: () => 'Disabled', disabled: true } }}
  isVertical
  multiple
  selection={selectionValue}
  onSelectionChange={setSelectionValue} />`} />
            </div>
          </div>
        </div>
      },

      completionBar: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faPercentageSolid : faPercentage} />
          <span>Completion</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faPercentageSolid} /> Completion Bar</h1>
          <span className="doc-desc">Completion Bar component. Shows Progress or Fulfilment.</span>
          <ul className="doc-tags">
            <li>Completion</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>title</td><td><Icon source="fa" icon={faTimes} /></td><td>Title of the graph (HTML is ok)</td></tr>
              <tr><td>details</td><td><Icon source="fa" icon={faTimes} /></td><td>Details of the value (HTML is ok, something like '120 / 240' is recommended)</td></tr>
              <tr><td>percentage</td><td><Icon source="fa" icon={faCheck} /></td><td>Graph value, between 0 and 100 (any value above 100 will be capped to 100)</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Example</h3>
            <div className="doc-example-exec">
              <CompletionBar percentage={numValue} title={<span>Graph Value</span>} details={<span>Details</span>} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<CompletionBar
  percentage={numValue}
  title={<span>Graph Value</span>}
  details={<span>Details</span>} />`} />
            </div>
          </div>
        </div>
      },

      debug: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faBugSolid : faBug} />
          <span>Debug</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faBugSolid} /> Debug</h1>
          <span className="doc-desc">Debug component. Shows System information.</span>
          <ul className="doc-tags">
            <li>Debug</li>
            <li>System</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>initialData</td><td><Icon source="fa" icon={faCheck} /></td><td>Initiial Data (from saved data or directly from UserAgentService.getAll())</td></tr>
              <tr><td>isLive</td><td><Icon source="fa" icon={faTimes} /></td><td>Refresh data automatically every 1 second with the current system data (default is false)</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Example</h3>
            <div className="doc-example-exec">
              <Debug initialData={UserAgentService.getAll()} isLive />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Debug initialData={UserAgentService.getAll()} isLive />`} />
            </div>
            <span className="doc-example-desc">
              By setting the prop 'isLive' to true, the data is refreshed every second with your current configuration
            </span>
          </div>
        </div>
      },

      exTable: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faTableSolid : faTable} />
          <span>ExTable</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faTableSolid} /> ExTable</h1>
          <span className="doc-desc">Data Table, with search, filter, sort, view switch built-in.</span>
          <ul className="doc-tags">
            <li>ExTable</li>
            <li>Table</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>header</td><td><Icon source="fa" icon={faTimes} /></td><td>Title of the ExTable (HTML is ok)</td></tr>
              <tr><td>loading</td><td><Icon source="fa" icon={faTimes} /></td><td>Set to true to indicate that some data is loading. Reset to false once data is loaded</td></tr>
              <tr><td>items
                  <span className="doc-t">
                    {'{'}<br/>
                    <span className="doc-t">
                      itemKey: {'{'}<br/>
                        <span className="doc-t">...</span>
                      {'}'}
                    </span>
                    {'}'}
                  </span>
                </td><td><Icon source="fa" icon={faCheck} /></td><td>Items to be printed</td></tr>
              <tr><td>renderItem</td><td><Icon source="fa" icon={faCheck} /></td><td>Function that renders one item. It is called with (itemKey, itemData, view), view is the active view from EXTABLE_VIEWS view.</td></tr>
              <tr><td>isNoFrame</td><td><Icon source="fa" icon={faTimes} /></td><td>Ask to print the ExTable without a frame, to be embed into other components (default false)</td></tr>
              <tr><td>fss
                  <span className="doc-t">
                    {'{'}<br/>
                    <span className="doc-t">
                      filter: {'{'}<br/>
                        <span className="doc-t">
                          filterKey: {'{'}
                          <span className="doc-t">
                            title: 'Filter Title',<br/>
                            {'apply: (itemKey, itemData) => boolean'}
                          </span>
                          {'}'}
                        </span>
                      {'}'},<br/>
                      search: {'(itemKey, itemData, searchTerm) => boolean'},<br/>
                      sort: {'{'}
                      <span className="doc-t">
                        title: 'Sort Title',<br/>
                        {'apply: (keys, items, sortDirection) => keys'},<br/>
                        default: true
                      </span>
                      {'}'}
                    </span><br/>
                    {'}'}
                  </span>
                </td><td><Icon source="fa" icon={faTimes} /></td><td>FSS Object (by default, if nothing is passed, filter, search and sort are not available to the user)<br/>
                  Each part (filter, search, sort) is optional. Passing them into FSS will trigger the user interface.<br/>
                  Each filter has a key, a title (that will be presented to the user), and an apply function.<br/>
                  The apply function must return true if the item should not be filtered and still be visible, given that the filter is activated when the apply function is called.<br/>
                  The search function should return true if the item can correspond to search results, given the search term argument.<br/>
                  Each sort possibility has a key, and an apply function. You can also mark one as default. This apply function is called with the keys (already filtered from filter and search), so you must consider this input as your main entry point.<br/>
                  Additionally, you have the full item list, and the sort direction (from EXTABLE_SORT_DIRECTION enum)
                  </td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Basic Example</h3>
            <div className="doc-example-exec">
              <ExTable items={{ item1: 'content 1', item2: 'content 2' }} renderItem={(_, itemData) => <span>{itemData}</span>} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<ExTable
  items={{ item1: 'content 1', item2: 'content 2' }}
  renderItem={(_, itemData) => <span>{itemData}</span>} />`} />
            </div>
            <span className="doc-example-desc">
              The ExTable itself does not render the item. Instead, it puts the result of the renderItem parameter into corresponding element containers depending on the active view.
            </span>
          </div>
          <div className="doc-example">
            <h3>Complete Example without FSS</h3>
            <div className="doc-example-exec">
              <ExTable header={<span>Your items</span>} items={{ item1: 'content 1', item2: 'content 2' }} renderItem={(_, itemData) => <span>{itemData}</span>} defaultView={EXTABLE_VIEWS.LIST} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<ExTable
  header={<span>Your items</span>}
  items={{ item1: 'content 1', item2: 'content 2' }}
  renderItem={(_, itemData) => <span>{itemData}</span>}
  defaultView={EXTABLE_VIEWS.LIST} />`} />
            </div>
            <span className="doc-example-desc">
              You can pass a default view, but you can't prevent the user to change it to another one.
            </span>
          </div>
          <div className="doc-example">
            <h3>Complete Example with FSS</h3>
            <div className="doc-example-exec">
              <ExTable header={<span>Your items</span>} items={{ item1: { name: 'Dan', isBoy: true }, item2: { name: 'Ashley', isBoy: false }, item3: { name: 'Jack', isBoy: true }, item4: { name: 'Tom', isBoy: true }, item5: { name: 'Lilly', isBoy: false } }}
                renderItem={(_, itemData) => <span>{itemData.name}</span>} defaultView={EXTABLE_VIEWS.CONDENSED}
                fss={{
                  filter: {
                    boys: {
                      title: 'Boys',
                      apply: (_, itemData) => itemData.isBoy
                    },
                    girls: {
                      title: 'Girls',
                      apply: (_, itemData) => !itemData.isBoy
                    }
                  },
                  search: (_, itemData, searchTerm) => itemData.name.toLowerCase().includes(searchTerm.toLowerCase()),
                  sort: {
                    firstname: {
                      title: 'Firstname',
                      apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
                        (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].name, items[key2].name)
                      )),
                      default: true
                    }
                  }
                }} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<ExTable
  header={<span>Your items</span>}
  items={{ item1: { name: 'Dan', isBoy: true }, item2: { name: 'Ashley', isBoy: false }, item3: { name: 'Jack', isBoy: true }, item4: { name: 'Tom', isBoy: true }, item5: { name: 'Lilly', isBoy: false } }}
  renderItem={(_, itemData) => <span>{itemData.name}</span>}
  defaultView={EXTABLE_VIEWS.CONDENSED}
  fss={{
    filter: {
      boys: {
        title: 'Boys',
        apply: (_, itemData) => itemData.isBoy
      },
      girls: {
        title: 'Girls',
        apply: (_, itemData) => !itemData.isBoy
      }
    },
    search: (_, itemData, searchTerm) => itemData.name.toLowerCase().includes(searchTerm.toLowerCase()),
    sort: {
      firstname: {
        title: 'Firstname',
        apply: (keys, items, sortDirection) => keys.sort((key1, key2) => (
          (sortDirection === 'ASC' ? 1 : -1) * UtilsService.compareFn(items[key1].name, items[key2].name)
        )),
        default: true
      }
    }
  }} />`} />
            </div>
            <span className="doc-example-desc">
              The ExTable is configured with the condensed view. Items are now persons, with a firstname (name field), and their gender (isBoy).<br/>
              The renderItem method now prints the name of the person.<br/>
              About the FSS:<br/>
              There's 2 filters. The first one, boys, return true if the item isBoy attribute is true, the second, girls, returns the inverse.<br/>
              This permits to only show boys or girls according to the 'isBoy' attribute of each item.<br/>
              The search function search for item's names that contains the search term, case insensitively.<br/>
              There's also one sort. This sort takes all keys, and call the compareFn from UtilsService to sort them with their names.<br/>
              The result is next kept as it is, or inversed (by multiplying with -1) according to the sort direction.
            </span>
          </div>
        </div>
      },

      formAutoSuggestInput: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={faICursor} additionalSource="fa" additional={isActive ? faCommentDotsSolid : faCommentDots} />
          <span>Sug Input</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faICursorSolid} additionalSource="fa" additional={faCommentDotsSolid} /> Form AutoSuggest Input</h1>
          <span className="doc-desc">Simple Form Input component, alongside an auto suggestion feature.</span>
          <ul className="doc-tags">
            <li>Input</li>
            <li>AutoSuggest</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>value</td><td><Icon source="fa" icon={faCheck} /></td><td>Value of the field</td></tr>
              <tr><td>fieldName</td><td><Icon source="fa" icon={faTimes} /></td><td>Unique name passed to onValueChange callback to identify the input</td></tr>
              <tr><td>selectedItemKey</td><td><Icon source="fa" icon={faCheck} /></td><td>Key of the selected item. Pass '' if no item is selected</td></tr>
              <tr><td>selectedItem</td><td><Icon source="fa" icon={faCheck} /></td><td>Value of the selected item (null if there's no selected item)</td></tr>
              <tr><td>possibleItems
                  <span className="doc-t">
                    {'{'}<br/>
                    <span className="doc-t">
                      itemKey: {'{'}<br/>
                        <span className="doc-t">
                          content: Content
                        </span>
                      {'}'}
                    </span><br/>
                    {'}'}
                  </span>
                </td><td><Icon source="fa" icon={faCheck} /></td><td>List of possible items that the user can select. This list should be modified each time the value changes and be {'{}'} by default.<br/>
                itemKey: unique identifier of the item<br/>
                content returns the HTML content of the item</td></tr>
              <tr><td>inputRequired</td><td><Icon source="fa" icon={faTimes} /></td><td>Tells if the input is required (default false)</td></tr>
              <tr><td>label</td><td><Icon source="fa" icon={faTimes} /></td><td>Label of the input (HTML is possible - default is no label, even if it's not advised)</td></tr>
              <tr><td>inputName</td><td><Icon source="fa" icon={faTimes} /></td><td>Name of the input</td></tr>
              <tr><td>inputAutocomplete</td><td><Icon source="fa" icon={faTimes} /></td><td>Autocomplete of the input, as HTML specifications</td></tr>
              <tr><td>instructions</td><td><Icon source="fa" icon={faTimes} /></td><td>Instructions to the user to fulfill the input</td></tr>
              <tr><td>onValueChange</td><td><Icon source="fa" icon={faCheck} /></td><td>Callback when value changes: calls with (value, fieldName)</td></tr>
              <tr><td>onSelectedItemChange</td><td><Icon source="fa" icon={faCheck} /></td><td>Callback when the selection changes: calls with (itemKey, fieldName, itemData)</td></tr>
            </tbody>
          </table>
          <h3>Behaviour</h3>
          <ol>
            <li>The user enter a search term</li>
            <li>at each change, the callback onValueChange is called</li>
            <li>YOU have to compute the possibleItems, and set them</li>
            <li>the input proposes the different items</li>
            <li>the user selects an item</li>
            <li>the callback onSelectedItemChange is called with the item data</li>
            <li>you save the value and pass it via selectedItem and selectedItemKey</li>
            <li>the form input displays the selected item</li>
          </ol>
          <div className="doc-example">
            <h3>Example</h3>
            <div className="doc-example-exec">
              <div>Possible items: {possibleItems ? JSON.stringify(possibleItems) : 'No items are proposed yet'}</div>
              <div>Value: {formStringValue.toString()}</div>
              <div>Selected item: {selectedItemKey ? `${selectedItemKey} / ${JSON.stringify(selectedItem)}` : 'No item is selected'}</div>
              <FormAutoSuggestInput value={formStringValue} onValueChange={val => {
                setFormStringValue(val);
                setPossibleItems(val ? { id1: { content: 'content 1', value: 'id1' }, id2: { content: 'content 2', value: 'id2' } } : {});
              }} possibleItems={possibleItems} selectedItem={selectedItem} selectedItemKey={selectedItemKey} onSelectedItemChange={(key, _, val) => {
                setSelectedItemKey(key);
                setSelectedItem(val);
              }} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<FormAutoSuggestInput
  value={formStringValue}
  onValueChange={val => {
    setFormStringValue(val);
    setPossibleItems(val ? { id1: { content: 'content 1', value: 'id1' }, id2: { content: 'content 2', value: 'id2' } } : {});
  }}
  possibleItems={possibleItems}
  selectedItem={selectedItem}
  selectedItemKey={selectedItemKey}
  onSelectedItemChange={(key, _, val) => {
    setSelectedItemKey(key);
    setSelectedItem(val);
  }} />`} />
            </div>
            <span className="doc-example-desc">
              In this example, the input value is stored inside formInputValue. Checking if this value is not null, some possibleItems are set if that's the case.<br/>
              Once set, the possible items are displayed. When the user clicks one, the value and possibleItems are reset, and the selectedItem is now fulfilled.<br/>
              Of course, you can set the possible items asyncrhonously when you receive a new value from the input. For aynschronous API calls, formDebounceAutoSuggestInput is recommended!
            </span>
          </div>
        </div>
      },

      formDebounceAutoSuggestInput: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={faICursor} additionalSource="fa" additional={isActive ? faCommentDotsSolid : faCommentDots} />
          <span>Deb Sug Input</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faICursorSolid} additionalSource="fa" additional={faCommentDotsSolid} /> Form Debounce AutoSuggest Input</h1>
          <span className="doc-desc">Simple Form Input component, with debounce alongside an auto suggestion feature.</span>
          <ul className="doc-tags">
            <li>Input</li>
            <li>AutoSuggest</li>
            <li>Debounce</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>value</td><td><Icon source="fa" icon={faCheck} /></td><td>Value of the field</td></tr>
              <tr><td>selectedItem</td><td><Icon source="fa" icon={faCheck} /></td><td>Value of the selected item (null if there's no selected item)</td></tr>
              <tr><td>selectedItemKey</td><td><Icon source="fa" icon={faCheck} /></td><td>Key of the selected item. Pass '' if no item is selected</td></tr>
              <tr><td>possibleItems
                  <span className="doc-t">
                    {'{'}<br/>
                    <span className="doc-t">
                      itemKey: {'{'}<br/>
                        <span className="doc-t">
                          content: Content
                        </span>
                      {'}'}
                    </span><br/>
                    {'}'}
                  </span>
                </td><td><Icon source="fa" icon={faCheck} /></td><td>List of possible items that the user can select. This list should be modified each time the value changes and be {'{}'} by default.<br/>
                itemKey: unique identifier of the item<br/>
                content returns the HTML content of the item</td></tr>
              <tr><td>fieldName</td><td><Icon source="fa" icon={faTimes} /></td><td>Unique name passed to onValueChange callback to identify the input</td></tr>
              <tr><td>inputName</td><td><Icon source="fa" icon={faTimes} /></td><td>Name of the input</td></tr>
              <tr><td>label</td><td><Icon source="fa" icon={faTimes} /></td><td>Label of the input (HTML is possible - default is no label, even if it's not advised)</td></tr>
              <tr><td>inputAutocomplete</td><td><Icon source="fa" icon={faTimes} /></td><td>Autocomplete of the input, as HTML specifications</td></tr>
              <tr><td>inputRequired</td><td><Icon source="fa" icon={faTimes} /></td><td>Tells if the input is required (default false)</td></tr>
              <tr><td>instructions</td><td><Icon source="fa" icon={faTimes} /></td><td>Instructions to the user to fulfill the input</td></tr>
              <tr><td>onValueChange</td><td><Icon source="fa" icon={faCheck} /></td><td>Callback when value changes: calls with (value, fieldName)</td></tr>
              <tr><td>onSelectedItemChange</td><td><Icon source="fa" icon={faCheck} /></td><td>Callback when the selection changes: calls with (itemKey, fieldName, itemData)</td></tr>
            </tbody>
          </table>
          <h3>Behaviour</h3>
          <ol>
            <li>The user enter a search term</li>
            <li>at each change, the callback onValueChange is called if it did no change in the past 1100 ms</li>
            <li>YOU have to compute the possibleItems, and set them</li>
            <li>the input proposes the different items</li>
            <li>the user selects an item</li>
            <li>the callback onSelectedItemChange is called with the item data</li>
            <li>you save the value and pass it via selectedItem and selectedItemKey</li>
            <li>the form input displays the selected item</li>
          </ol>
          <div className="doc-example">
            <h3>Example</h3>
            <div className="doc-example-exec">
              <div>Possible items: {possibleItems ? JSON.stringify(possibleItems) : 'No items are proposed yet'}</div>
              <div>Value: {formStringValue.toString()}</div>
              <div>Selected item: {selectedItemKey ? `${selectedItemKey} / ${JSON.stringify(selectedItem)}` : 'No item is selected'}</div>
              <FormDebounceAutoSuggestInput value={formStringValue} onValueChange={val => {
                setFormStringValue(val);
                setPossibleItems(val ? { id1: { content: 'content 1', value: 'id1' }, id2: { content: 'content 2', value: 'id2' } } : {});
              }} possibleItems={possibleItems} selectedItem={selectedItem} selectedItemKey={selectedItemKey} onSelectedItemChange={(key, _, val) => {
                setSelectedItemKey(key);
                setSelectedItem(val);
              }} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<FormDebounceAutoSuggestInput
  value={formStringValue}
  onValueChange={val => {
    setFormStringValue(val);
    setPossibleItems(val ? { id1: { content: 'content 1', value: 'id1' }, id2: { content: 'content 2', value: 'id2' } } : {});
  }}
  possibleItems={possibleItems}
  selectedItem={selectedItem}
  selectedItemKey={selectedItemKey}
  onSelectedItemChange={(key, _, val) => {
    setSelectedItemKey(key);
    setSelectedItem(val);
  }} />`} />
            </div>
            <span className="doc-example-desc">
              In this example, the input value is stored inside formInputValue, if it remains untouched for 1100ms.<br/>
              Checking if this value is not null, some possibleItems are set if that's the case.<br/>
              Once set, the possible items are displayed. When the user clicks one, the value and possibleItems are reset, and the selectedItem is now fulfilled.<br/>
              Of course, you can set the possible items asyncrhonously when you receive a new value from the input. For aynschronous API calls, formDebounceAutoSuggestInput is recommended!
            </span>
          </div>
        </div>
      },

      formDebounceInput: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={faICursor} additionalSource="fa" additional={isActive ? faClockSolid : faClock} />
          <span>Deb Input</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faICursorSolid} /> Form Debounce Input</h1>
          <span className="doc-desc">Simple Form Input component, with debounce.</span>
          <ul className="doc-tags">
            <li>Input</li>
            <li>Debounce</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>value</td><td><Icon source="fa" icon={faCheck} /></td><td>Value of the field</td></tr>
              <tr><td>fieldName</td><td><Icon source="fa" icon={faTimes} /></td><td>Unique name passed to onValueChange callback to identify the input</td></tr>
              <tr><td>inputName</td><td><Icon source="fa" icon={faTimes} /></td><td>Name of the input</td></tr>
              <tr><td>inputType</td><td><Icon source="fa" icon={faTimes} /></td><td>Type of the input, as HTML specifications (default text)</td></tr>
              <tr><td>inputAutocomplete</td><td><Icon source="fa" icon={faTimes} /></td><td>Autocomplete of the input, as HTML specifications</td></tr>
              <tr><td>inputPattern</td><td><Icon source="fa" icon={faTimes} /></td><td>Input Regex validation (default is no pattern)</td></tr>
              <tr><td>inputRequired</td><td><Icon source="fa" icon={faTimes} /></td><td>Tells if the input is required (default false)</td></tr>
              <tr><td>label</td><td><Icon source="fa" icon={faTimes} /></td><td>Label of the input (HTML is possible - default is no label, even if it's not advised)</td></tr>
              <tr><td>instructions</td><td><Icon source="fa" icon={faTimes} /></td><td>Instructions to the user to fulfill the input</td></tr>
              <tr><td>onValueChange</td><td><Icon source="fa" icon={faCheck} /></td><td>Callback when value changes: calls with (value, fieldName)</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Example</h3>
            <div className="doc-example-exec">
              <div>Value: {formStringValue.toString()}</div>
              <FormDebounceInput value={formStringValue} onValueChange={setFormStringValue} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<FormDebounceInput
  value={formStringValue}
  onValueChange={setFormStringValue} />`} />
            </div>
            <span className="doc-example-desc">
              As you can see, the value is updated with a debounce of 1100ms. This means that it is updated only if it remains untouched for at least 1100 ms.
            </span>
          </div>
        </div>
      },

      formInput: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faICursorSolid : faICursor} />
          <span>Input</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faICursorSolid} /> Form Input</h1>
          <span className="doc-desc">Simple Form Input component.</span>
          <ul className="doc-tags">
            <li>Input</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>value</td><td><Icon source="fa" icon={faCheck} /></td><td>Value of the field</td></tr>
              <tr><td>fieldName</td><td><Icon source="fa" icon={faTimes} /></td><td>Unique name passed to onValueChange callback to identify the input</td></tr>
              <tr><td>inputType</td><td><Icon source="fa" icon={faTimes} /></td><td>Type of the input, as HTML specifications (default text)</td></tr>
              <tr><td>inputName</td><td><Icon source="fa" icon={faTimes} /></td><td>Name of the input</td></tr>
              <tr><td>inputAutocomplete</td><td><Icon source="fa" icon={faTimes} /></td><td>Autocomplete of the input, as HTML specifications</td></tr>
              <tr><td>inputRequired</td><td><Icon source="fa" icon={faTimes} /></td><td>Tells if the input is required (default false)</td></tr>
              <tr><td>inputPattern</td><td><Icon source="fa" icon={faTimes} /></td><td>Input Regex validation (default is no pattern)</td></tr>
              <tr><td>inputDisabled</td><td><Icon source="fa" icon={faTimes} /></td><td>Tells if the input is disabled or not (default false)</td></tr>
              <tr><td>noValidation</td><td><Icon source="fa" icon={faTimes} /></td><td>Hides the validation indicator</td></tr>
              <tr><td>label</td><td><Icon source="fa" icon={faTimes} /></td><td>Label of the input (HTML is possible - default is no label, even if it's not advised)</td></tr>
              <tr><td>instructions</td><td><Icon source="fa" icon={faTimes} /></td><td>Instructions to the user to fulfill the input</td></tr>
              <tr><td>onValueChange</td><td><Icon source="fa" icon={faCheck} /></td><td>Callback when value changes: calls with (value, fieldName)</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Basic Example</h3>
            <div className="doc-example-exec">
              <div>Value: {formStringValue.toString()}</div>
              <FormInput value={formStringValue} onValueChange={setFormStringValue} noValidation />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<FormInput
  value={formStringValue}
  onValueChange={setFormStringValue} />`} />
            </div>
          </div>
          <div className="doc-example">
            <h3>Complete Example</h3>
            <div className="doc-example-exec">
              <div>Value: {formStringValue.toString()}</div>
              <FormInput value={formStringValue} onValueChange={setFormStringValue} inputType="email" inputRequired inputAutoComplete="email" inputName="email" label={<span><Icon source="fa" icon={faEnvelope} /> Email</span>} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<FormInput
  value={formStringValue}
  onValueChange={setFormStringValue}
  inputType="email"
  inputRequired
  inputAutoComplete="email"
  inputName="email"
  label={<span><Icon source="fa" icon={faEnvelope} /> Email</span>} />`} />
            </div>
          </div>
        </div>
      },

      formInputFile: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faFileUploadSolid : faFileUpload} />
          <span>File Input</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faAlignJustifySolid} /> Form Input File</h1>
          <span className="doc-desc">Simple Form File Input component.</span>
          <ul className="doc-tags">
            <li>File</li>
            <li>Input</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>fieldName</td><td><Icon source="fa" icon={faTimes} /></td><td>Unique name passed to onValueChange callback to identify the input</td></tr>
              <tr><td>inputName</td><td><Icon source="fa" icon={faTimes} /></td><td>Name of the input</td></tr>
              <tr><td>inputRequired</td><td><Icon source="fa" icon={faTimes} /></td><td>Tells if the input is required (default false)</td></tr>
              <tr><td>label</td><td><Icon source="fa" icon={faTimes} /></td><td>Label of the input (HTML is possible - default is no label, even if it's not advised)</td></tr>
              <tr><td>instructions</td><td><Icon source="fa" icon={faTimes} /></td><td>Instructions to the user to fulfill the input</td></tr>
              <tr><td>imagePreview</td><td><Icon source="fa" icon={faTimes} /></td><td>Tells the input to show the preview of image files</td></tr>
              <tr><td>value</td><td><Icon source="fa" icon={faCheck} /></td><td>Value of the field, structured as {'{ file, url }'}</td></tr>
              <tr><td>onValueChange</td><td><Icon source="fa" icon={faCheck} /></td><td>Callback when value changes: calls with (value, fieldName)</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Basic Example</h3>
            <div className="doc-example-exec">
              <div>Value: {fileValue ? fileValue.file.name : null}</div>
              <FormInputFile value={fileValue} onValueChange={setFileValue} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<FormInputFile
  value={fileValue}
  onValueChange={setFileValue} />`} />
            </div>
          </div>
          <div className="doc-example">
            <h3>Complete Example</h3>
            <div className="doc-example-exec">
              <div>Value: {imageFileValue ? imageFileValue.file.name : null}</div>
              <FormInputFile value={imageFileValue} onValueChange={setImageFileValue} 
                label={ <span><Icon source="fa" icon={faImage} /> Profile Picture</span>}
                accept="image/*" imagePreview instructions={<span>Please upload your user's profile picture</span>} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<FormInputFile
  value={imageFileValue}
  onValueChange={setImageFileValue} 
  label={ <span><Icon source="fa" icon={faImage} /> Profile Picture</span>}
  accept="image/*"
  imagePreview
  instructions={<span>Please upload your user's profile picture</span>} />`} />
            </div>
          </div>
        </div>
      },

      formTextArea: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faAlignJustifySolid : faAlignJustify} />
          <span>TextArea</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faAlignJustifySolid} /> Form TextArea</h1>
          <span className="doc-desc">Simple Form Textarea component.</span>
          <ul className="doc-tags">
            <li>Textarea</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>value</td><td><Icon source="fa" icon={faCheck} /></td><td>Value of the field</td></tr>
              <tr><td>fieldName</td><td><Icon source="fa" icon={faTimes} /></td><td>Unique name passed to onValueChange callback to identify the input</td></tr>
              <tr><td>inputName</td><td><Icon source="fa" icon={faTimes} /></td><td>Name of the input</td></tr>
              <tr><td>inputAutocomplete</td><td><Icon source="fa" icon={faTimes} /></td><td>Autocomplete of the input, as HTML specifications</td></tr>
              <tr><td>inputRequired</td><td><Icon source="fa" icon={faTimes} /></td><td>Tells if the input is required (default false)</td></tr>
              <tr><td>inputDisabled</td><td><Icon source="fa" icon={faTimes} /></td><td>Tells if the input is disabled or not (default false)</td></tr>
              <tr><td>label</td><td><Icon source="fa" icon={faTimes} /></td><td>Label of the input (HTML is possible - default is no label, even if it's not advised)</td></tr>
              <tr><td>instructions</td><td><Icon source="fa" icon={faTimes} /></td><td>Instructions to the user to fulfill the input</td></tr>
              <tr><td>onValueChange</td><td><Icon source="fa" icon={faCheck} /></td><td>Callback when value changes: calls with (value, fieldName)</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Basic Example</h3>
            <div className="doc-example-exec">
              <div>Value: {formStringValue.toString()}</div>
              <FormTextarea value={formStringValue} onValueChange={setFormStringValue} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<FormTextarea
  value={formStringValue}
  onValueChange={setFormStringValue} />`} />
            </div>
          </div>
          <div className="doc-example">
            <h3>Complete Example</h3>
            <div className="doc-example-exec">
              <div>Value: {formStringValue.toString()}</div>
              <FormTextarea value={formStringValue} onValueChange={setFormStringValue} inputRequired inputName="description" label={<span><Icon source="fa" icon={faAlignJustifySolid} /> Description</span>} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<FormTextarea
  value={formStringValue}
  onValueChange={setFormStringValue}
  inputRequired
  inputName="description"
  label={<span><Icon source="fa" icon={faAlignJustifySolid} /> Description</span>} />`} />
            </div>
          </div>
        </div>
      },

      icon: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faShapesSolid : faShapes} />
          <span>Icon</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faShapesSolid} /> Icon</h1>
          <span className="doc-desc">Icon component.</span>
          <ul className="doc-tags">
            <li>Icon</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>source</td><td><Icon source="fa" icon={faCheck} /></td><td>Source of the icon, 'fa' | 'custom'</td></tr>
              <tr><td>containerclassname</td><td><Icon source="fa" icon={faTimes} /></td><td>Optional class to be put on the icon container</td></tr>
              <tr><td>icon</td><td><Icon source="fa" icon={faCheck} /></td><td>If source = 'fa', pass a FA/IconReference. If source = 'custom', pass a string from CUSTOM_ICONS</td></tr>
              <tr><td>addionalSource</td><td><Icon source="fa" icon={faTimes} /></td><td>Same as source, but for optional additional icon</td></tr>
              <tr><td>additional</td><td><Icon source="fa" icon={faTimes} /></td><td>Optional additional icon, if source = 'fa', pass a FA/IconReference. If source = 'custom', pass a string from CUSTOM_ICONS</td></tr>
              <tr><td>otherProps</td><td><Icon source="fa" icon={faTimes} /></td><td>Additional Props</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Basic Example</h3>
            <div className="doc-example-exec">
              <Icon source="fa" icon={faPlus} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Icon source="fa" icon={faPlus} />`} />
            </div>
          </div>
          <div className="doc-example">
            <h3>Complete Example</h3>
            <div className="doc-example-exec">
              <Icon source="custom" icon="Rim" additionalSource="fa" additional={faPlus} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Icon source="custom" icon="Rim" additionalSource="fa" additional={faPlus} />`} />
            </div>
          </div>
          <span className="doc-example-desc">
            <h3>All custom icons:</h3>
            {Object.keys(CUSTOM_ICONS).map(iconKey => <Fragment key={iconKey}>
              <span>{iconKey} / <Icon source="custom" icon={iconKey} /></span><br/>
            </Fragment>)}
          </span>
        </div>
      },

      loader: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faSpinnerSolid : faSpinner} />
          <span>Loader</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faSpinnerSolid} /> Loader</h1>
          <span className="doc-desc">Loader component.</span>
          <ul className="doc-tags">
            <li>Loader</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>light</td><td><Icon source="fa" icon={faTimes} /></td><td>Put the loader in white for dark backgrounds (default false)</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Example</h3>
            <div className="doc-example-exec">
              <Loader />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Loader />`} />
            </div>
          </div>
        </div>
      },

      logTrackTimeline: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faHistorySolid : faHistory} />
          <span>Timeline</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faMapSolid} /> LogTrack Timeline</h1>
          <span className="doc-desc">LogTrack Timeline component. This component is for the moment only compatible with LogTracks.</span>
          <ul className="doc-tags">
            <li>LogTracks</li>
            <li>Timeline</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>logtracks</td><td><Icon source="fa" icon={faCheck} /></td><td>Mandatory LogTrack Object</td></tr>
              <tr><td>isLoading</td><td><Icon source="fa" icon={faTimes} /></td><td>Tells the component to show a loader and not parse LogTracks until isLoading is false (default is false).</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Example</h3>
            <div className="doc-example-exec">
              <LogTrackTimeline logtracks={computeLogTracks()} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<LogTrackTimeline logtracks={computeLogTracks()} />`} />
            </div>
          </div>
          <span className="doc-example-desc">
            
          </span>
        </div>
      },

      map: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faMapSolid: faMap} />
          <span>Map</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faMapSolid} /> Map</h1>
          <span className="doc-desc">Map component.</span>
          <ul className="doc-tags">
            <li>Map</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>gpsMode</td><td><Icon source="fa" icon={faTimes} /></td><td>If GPS mode is enabled, tha map is printed with simulated 3D.</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Example</h3>
            <div className="doc-example-exec">
              <Map ref={mapRef} />
              <button onClick={() => {
                mapRef.current.addMarker((Math.floor(Math.random() * 40052752) - 20026376), (Math.floor(Math.random() * 40052752) - 20026376), 'Popup content');
                setTimeout(mapRef.current.centerOnAllMarkers, 500);
              }}>Add a random marker</button>
              <button onClick={() => mapRef.current.deleteAllMarkers()}>Remove all</button>
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Map ref={mapRef} />
  <button onClick={() => {
    mapRef.current.addMarker((Math.floor(Math.random() * 40052752) - 20026376), (Math.floor(Math.random() * 40052752) - 20026376), 'Popup content');
    setTimeout(mapRef.current.centerOnAllMarkers, 500);
  }}>Add a random marker</button>
  <button onClick={() => mapRef.current.deleteAllMarkers()}>Remove all</button>`} />
            </div>
          </div>
          <span className="doc-example-desc">
            The 'add a random marker' creates a marker with random coordinates in EPSG:3857.<br/>
            It is very recommended to follow the Ref pattern from React for this component.
          </span>
        </div>
      },

      modal: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faWindowSolid : faWindow} />
          <span>Modal</span>
        </span>,
          content: () => <div>
          <h1><Icon source="fa" icon={faWindowSolid} /> Modal</h1>
          <span className="doc-desc">Modal component, prints a modal on top of the website's content.<br/>
            This part only described how to use ModalService. The Modal component must never be used directly.</span>
          <ul className="doc-tags">
            <li>Modal</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>title</td><td><Icon source="fa" icon={faCheck} /></td><td>Title of the modal</td></tr>
              <tr><td>content</td><td><Icon source="fa" icon={faCheck} /></td><td>Content of the modal</td></tr>
              <tr><td>options
                  <span className="doc-t">
                    {'{'}<br/>
                    <span className="doc-t">
                      noClose: false,<br/>
                      actions: [<br/>
                        <span className="doc-t">
                          {'{'}<br/>
                            <span className="doc-t">
                              value: 'key',<br/>
                              content: 'content'<br/>
                            </span>
                          {'}'}
                        </span>
                      ]
                    </span><br/>
                    {'}'}
                  </span>
                  </td><td><Icon source="fa" icon={faCheck} /></td><td>Options:<br/>
                      noClose: The user can't close the popup via a close button or clicking the overlay. He must choose between actions.<br/>
                      actions: Array of actions printed at the bottom of the popup. This parameter is mandatory!<br/>
                      value: Key with which the callback will be called if the user clicks the corresponding button<br/>
                      content: Text to be printed inside the corresponding button
                  </td></tr>
              <tr><td>callback</td><td><Icon source="fa" icon={faTimes} /></td><td>Callback to be called when the user clicks an action</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Example</h3>
            <div className="doc-example-exec">
              <Icon source="fa" icon={faPlus} onClick={() => ModalService.showModal('Title', 'Content', { actions: [ { value: 'act1', content: 'Action 1' } ] }, act => alert('The user clicked on ' + act))} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Icon
  source="fa"
  icon={faPlus}
  onClick={() => 
    ModalService.showModal('Title', 'Content', {
      actions: [
        { value: 'act1', content: 'Action 1' }
      ] },
      act => alert('The user clicked on ' + act))} />`} />
            </div>
          </div>
        </div>
      },

      pageLink: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faFileImportSolid : faFileImport} />
          <span>PageLink</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faFileImportSolid} /> PageLink</h1>
          <span className="doc-desc">PageLink component, prints a rich link to an entity.<br/>
            For the moment, Companies, Contracts, Employees, Equipments, Job Offers and Warehouses are supported.</span>
          <ul className="doc-tags">
            <li>Link</li>
            <li>Page</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>type</td><td><Icon source="fa" icon={faCheck} /></td><td>Type of the entity to print (from PageLinkType)</td></tr>
              <tr><td>entityId</td><td><Icon source="fa" icon={faCheck} /></td><td>Id of this entity</td></tr>
              <tr><td>entityData</td><td><Icon source="fa" icon={faCheck} /></td><td>Data of this entity</td></tr>
              <tr><td>noLink</td><td><Icon source="fa" icon={faTimes} /></td><td>Prints it with no link (default false)</td></tr>
              <tr><td>white</td><td><Icon source="fa" icon={faTimes} /></td><td>Prints it on white, to be on top of color (default false)</td></tr>
              <tr><td>noPhoto</td><td><Icon source="fa" icon={faTimes} /></td><td>Prints it with no logo / photo (default false)</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Example</h3>
            <div className="doc-example-exec">
              <PageLink type={PageLinkType.EMPLOYEE} entityId="-1" entityData={{ firstname: 'John', lastname: 'Doe', profilePictureUrl: dotImg }} />
              <PageLink type={PageLinkType.COMPANY} entityId="-1" entityData={{ name: 'Test Company', plan: 'BASIC', logoURL: dotImg }} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<PageLink
  type={PageLinkType.EMPLOYEE}
  entityId="-1"
  entityData={{ firstname: 'John', lastname: 'Doe', profilePictureUrl: dotImg }} />
<PageLink
  type={PageLinkType.COMPANY} 
  entityId="-1" 
  entityData={{ name: 'Test Company', plan: 'BASIC', logoURL: dotImg }} />`} />
            </div>
          </div>
        </div>
      },

      radio: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faDotCircleSolid: faDotCircle} />
          <span>Radio</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faDotCircleSolid} /> Radio</h1>
          <span className="doc-desc">Radio component.</span>
          <ul className="doc-tags">
            <li>Radio</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>value</td><td><Icon source="fa" icon={faCheck} /></td><td>Value of the field (true | false)</td></tr>
              <tr><td>fieldName</td><td><Icon source="fa" icon={faCheck} /></td><td>Name considered as the value of the input. onValueChange is called with this value</td></tr>
              <tr><td>inputName</td><td><Icon source="fa" icon={faTimes} /></td><td>Name of the input. Can be used to group radio input together.</td></tr>
              <tr><td>inputDisabled</td><td><Icon source="fa" icon={faTimes} /></td><td>Tells if the input is disabled or not (default false)</td></tr>
              <tr><td>inputRequired</td><td><Icon source="fa" icon={faTimes} /></td><td>Tells if the input is required (default false). If true, check if at least one radio is selected by group.</td></tr>
              <tr><td>label</td><td><Icon source="fa" icon={faTimes} /></td><td>Label of the input (HTML is possible - default is no label)</td></tr>
              <tr><td>onValueChange</td><td><Icon source="fa" icon={faCheck} /></td><td>Callback when value changes: calls with (value, fieldName)</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Example</h3>
            <div className="doc-example-exec">
              <div>Value: {stringValue.toString()}</div>
              <Radio value={stringValue} label="Radio 1" fieldName="value1" onValueChange={setStringValue} />
              <Radio value={stringValue} label="Radio 2" fieldName="value2" onValueChange={setStringValue} />
              <Radio value={stringValue} label="I'm disabled and has the same fieldName than radio 1" inputDisabled fieldName="value1" onValueChange={setStringValue} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Radio
  value={stringValue}
  label="Radio 1" 
  fieldName="value1"
  onValueChange={setStringValue} />
  <Radio
  value={stringValue}
  label="Radio 2"
  fieldName="value2"
  onValueChange={setStringValue} />
  <Radio
  value={stringValue}
  label="I'm disabled and has the same fieldName than radio 1"
  inputDisabled
  fieldName="value1"
  onValueChange={setStringValue} />`} />
            </div>
            <span className="doc-example-desc">
              Disable an input via the 'inputDisabled' attribute avoid the user's interaction, but does not forbid you, the dev, to modify its value!
            </span>
          </div>
        </div>
      },

      range: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faSlidersHSolid : faSlidersH} />
          <span>Range</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faSlidersHSolid} /> Range</h1>
          <span className="doc-desc">Range component. Shows directly the value</span>
          <ul className="doc-tags">
            <li>Range</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>value</td><td><Icon source="fa" icon={faCheck} /></td><td>Value of the field (number)</td></tr>
              <tr><td>min</td><td><Icon source="fa" icon={faCheck} /></td><td>Minimum number value</td></tr>
              <tr><td>max</td><td><Icon source="fa" icon={faCheck} /></td><td>Maximum value</td></tr>
              <tr><td>step</td><td><Icon source="fa" icon={faTimes} /></td><td>Precision of the value (default 1)</td></tr>
              <tr><td>onChange</td><td><Icon source="fa" icon={faCheck} /></td><td>Callback when value changes: calls with (value, fieldName)</td></tr>
              <tr><td>fieldName</td><td><Icon source="fa" icon={faTimes} /></td><td>Unique name passed to onValueChange callback to identify the input</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Example</h3>
            <div className="doc-example-exec">
              <div>Value: {numValue.toString()}</div>
              <Range value={numValue} min={0} max={100} step={2} onChange={setNumValue} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Range
  value={numValue}
  min={0}
  max={100}
  step={2}
  onChange={setNumValue} />`} />
            </div>
            <span className="doc-example-desc">
              Beware of the step parameter. It is optional, but along with boundaries (min and max), final value might be different than expected!
            </span>
          </div>
        </div>
      },

      switch: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faToggleOnSolid : faToggleOn} />
          <span>Switch</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faToggleOnSolid} /> Switch</h1>
          <span className="doc-desc">Switch component, same behaviour than Checkbox, but with a different render.<br/>
            Don't use this component in forms. Instead, use it in settings and toggle buttons.</span>
          <ul className="doc-tags">
            <li>Switch</li>
            <li>Checkbox</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>value</td><td><Icon source="fa" icon={faCheck} /></td><td>Value of the field (true | false)</td></tr>
              <tr><td>fieldName</td><td><Icon source="fa" icon={faTimes} /></td><td>Unique name passed to onChange callback to identify the input</td></tr>
              <tr><td>label</td><td><Icon source="fa" icon={faTimes} /></td><td>Label of the input (HTML is possible - default is no label)</td></tr>
              <tr><td>onChange</td><td><Icon source="fa" icon={faCheck} /></td><td>Callback when value changes: calls with (value, fieldName)</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Example</h3>
            <div className="doc-example-exec">
              <div>Value: {booleanValue.toString()}</div>
              <Switch value={booleanValue} label="Click me!" onChange={setBooleanValue} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Switch
    value={booleanValue}
    label="Click me!"
    onChange={setBooleanValue} />`} />
            </div>
          </div>
        </div>
      },

      tabs: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faFolderSolid : faFolder} />
          <span>Tabs</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faFolderSolid} /> Tabs</h1>
          <span className="doc-desc">Tabs component, show some tabs with the content of the active one</span>
          <ul className="doc-tags">
            <li>Switch</li>
            <li>Checkbox</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>default</td><td><Icon source="fa" icon={faTimes} /></td><td>Key of the default active tab</td></tr>
              <tr><td>tabs
                  <span className="doc-t">
                    {'{'}<br/>
                    <span className="doc-t">
                      tabKey: {'{'}<br/>
                        <span className="doc-t">
                          name: {'({ isActive }) => name'},<br/>
                          content: {'() => content'},<br/>
                          disabled: false,<br/>
                          cleafix: false
                        </span>
                      {'}'}
                    </span><br/>
                    {'}'}
                  </span>
                </td><td><Icon source="fa" icon={faCheck} /></td><td>Tabs Object<br/>
                  tabKey: unique identifier of the tab<br/>
                  name: render function of the tab name. 'isActive' is true if this tab is active<br/>
                  content: render function of tab content<br/>
                  disabled: tells if the tab is disabled or not (default false)<br/>
                  clearfix: tells if the tab should be rendered as clearfix (takes all available space). Warning: If clearfix is true, name and content are not rendered!
                  </td></tr>
              <tr><td>label</td><td><Icon source="fa" icon={faTimes} /></td><td>Label of the input (HTML is possible - default is no label)</td></tr>
              <tr><td>onChange</td><td><Icon source="fa" icon={faCheck} /></td><td>Callback when value changes: calls with (value, fieldName)</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Basic Example</h3>
            <div className="doc-example-exec">
              <Tabs tabs={{ tab1: { name: () => 'Tab 1', content: () => 'Content 1' }, tab2: { name: () => 'Tab 2', content: () => 'Content 2' } }} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Tabs tabs={{ 
  tab1: { name: () => 'Tab 1', content: () => 'Content 1' },
  tab2: { name: () => 'Tab 2', content: () => 'Content 2' } }} />`} />
            </div>
          </div>
          <div className="doc-example">
            <h3>Complete Example</h3>
            <div className="doc-example-exec">
              <Tabs tabs={{ 
                tab1: { name: () => 'Tab 1', content: () => 'Content 1' },
                clrfx: { clearfix: true },
                tab2: { name: () => 'Tab 2', content: () => 'Content 2' },
                disabled: { name: () => 'Disabled tab', disabled: true } }}
                default="tab1"
                isHorizontalLayout />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Tabs tabs={{ 
  tab1: { name: () => 'Tab 1', content: () => 'Content 1' },
  clrfx: { clearfix: true },
  tab2: { name: () => 'Tab 2', content: () => 'Content 2' },
  disabled: { name: () => 'Disabled tab', disabled: true } }}
  default="tab1"
  isHorizontalLayout />`} />
            </div>
          </div>
        </div>
      },

      terms: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faFileSignatureSolid : faFileSignature} />
          <span>Terms</span>
        </span>,
        content: () => <div>
          Terms
        </div>,
        disabled: true
      },

      tooltip: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faCommentAltLinesSolid : faCommentAltLines} />
          <span>Tooltip</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faCommentAltLinesSolid} /> Tooltip</h1>
          <span className="doc-desc">Tooltip component, show some information on hover on other component</span>
          <ul className="doc-tags">
            <li>Tooltip</li>
          </ul>
          <h3>Props</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Required</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>tooltipPosition</td><td><Icon source="fa" icon={faTimes} /></td><td>Position of the tooltip, relative to its parent (from ETooltipPosition)</td></tr>
              <tr><td>tooltipTrianglePosition</td><td><Icon source="fa" icon={faTimes} /></td><td>Position of the tooltip's triangle (from ETooltipTrianglePosition)</td></tr>
              <tr><td>show</td><td><Icon source="fa" icon={faCheck} /></td><td>Boolean: should the tooltip be shown?</td></tr>
              <tr><td>label</td><td><Icon source="fa" icon={faCheck} /></td><td>Label of the tooltip (HTML is allowed)</td></tr>
              <tr><td>styles</td><td><Icon source="fa" icon={faTimes} /></td><td>Custom styles for the tooltip</td></tr>
            </tbody>
          </table>
          <div className="doc-example">
            <h3>Example</h3>
            <div className="doc-example-exec">
              <div style={{ position: 'relative', width: '50%', display: 'flex', justifyContent: 'center' }}>
                <Icon source="fa" icon={faPlus} onMouseOver={() => setTooltipHover(true)} onMouseOut={() => setTooltipHover(false)} />
                <Tooltip show={tooltipHover} label={<span>Some content or explanation here</span>} />
              </div>
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Icon
  source="fa"
  icon={faPlus}
  onMouseOver={() => setTooltipHover(true)}
  onMouseOut={() => setTooltipHover(false)} />
<Tooltip
  show={tooltipHover}
  label={<span>Some content or explanation here</span>} />`} />
            </div>
          </div>
        </div>
      },
    }} />
  </div>;
}

export default DevDocComponentsTab;
