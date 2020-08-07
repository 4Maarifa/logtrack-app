import React, { useState } from 'react';

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
  faAlignJustify as faAlignJustifySolid, faSlidersH as faSlidersHSolid, faToggleOn as faToggleOnSolid, faCheck, faTimes } from '@fortawesome/pro-solid-svg-icons';

import Accordion from './../../../Utils/Accordion/Accordion';
import ActionButton from './../../../Utils/ActionButton/ActionButton';
import ActionLink from './../../../Utils/ActionLink/ActionLink';
import ActionList from './../../../Utils/ActionList/ActionList';
import Checkbox from './../../../Utils/FormElements/Checkbox/Checkbox';
import Choose from './../../../Utils/FormElements/Choose/Choose';
import Code from './../../../Utils/Code/Code';
import CompletionBar from './../../../Utils/CompletionBar/CompletionBar';
import Icon from './../../../Utils/Icon/Icon';
import Loader from './../../../Utils/Loader/Loader';
import Radio from './../../../Utils/FormElements/Radio/Radio';
import Range from './../../../Utils/FormElements/Range/Range';
import Switch from './../../../Utils/FormElements/Switch/Switch';
import Tabs from './../../../Utils/Tabs/Tabs';

const DevDocComponentsTab = () => {

  const [booleanValue, setBooleanValue] = useState(true);
  const [stringValue, setStringValue] = useState('value1');
  const [numValue, setNumValue] = useState(50);
  const [selectionValue, setSelectionValue] = useState([]);

  return <div className="DevDocComponentsTab">
    <Tabs default="radio" isHorizontalLayout tabs={{

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
                          disabled: false
                        </span>
                      {'}'}
                    </span><br/>
                    {'}'}
                  </span>
                </td><td><Icon source="fa" icon={faCheck} /></td><td>Items that can be selected<br/>
                  itemKey: Unique identifier of the item<br/>
                  content: function that prints the item's content<br/>
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
              <Choose items={{ value1: { content: () => 'Item 1' }, value2: { content: () => 'Item 2' }, value3: { content: () => 'Item 3' }, disabled: { content: () => 'Disabled', disabled: true } }} isVertical multiple selection={selectionValue} onSelectionChange={setSelectionValue} />
            </div>
            <div className="doc-code">
              <span className="doc-code-indicator">JavaScript</span>
              <Code language="jsx" codeSnippet={`<Choose
  items={{ value1: { content: () => 'Item 1' }, value2: { content: () => 'Item 2' }, value3: { content: () => 'Item 3' }, disabled: { content: () => 'Disabled', disabled: true } }}
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
          Debug
        </div>
      },

      exTable: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faTableSolid : faTable} />
          <span>ExTable</span>
        </span>,
        content: () => <div>
          ExTable
        </div>
      },

      formAutoSuggestInput: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={faICursor} additionalSource="fa" additional={isActive ? faCommentDotsSolid : faCommentDots} />
          <span>Sug Input</span>
        </span>,
        content: () => <div>
          Form AutoSuggest Input
        </div>
      },

      formDebounceAutoSuggestInput: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={faICursor} additionalSource="fa" additional={isActive ? faClockSolid : faClock} />
          <span>Deb Sug Input</span>
        </span>,
        content: () => <div>
          Form Debounce AutoSuggest Input
        </div>
      },

      formDebounceInput: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={faICursor} additionalSource="fa" additional={isActive ? faClockSolid : faClock} />
          <span>Deb Input</span>
        </span>,
        content: () => <div>
          Form Debounce Input
        </div>
      },

      formInput: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faICursorSolid : faICursor} />
          <span>Input</span>
        </span>,
        content: () => <div>
          Form Input
        </div>
      },

      formInputFile: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faFileUploadSolid : faFileUpload} />
          <span>File Input</span>
        </span>,
        content: () => <div>
          Form Input File
        </div>
      },

      formTextArea: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faAlignJustifySolid : faAlignJustify} />
          <span>TextArea</span>
        </span>,
        content: () => <div>
          Form TextArea
        </div>
      },

      icon: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faShapesSolid : faShapes} />
          <span>Icon</span>
        </span>,
        content: () => <div>
          Icon
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
          Timeline
        </div>
      },

      map: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faMapSolid: faMap} />
          <span>Map</span>
        </span>,
        content: () => <div>
          Map
        </div>
      },

      modal: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faWindowSolid : faWindow} />
          <span>Modal</span>
        </span>,
        content: () => <div>
          Modal
        </div>
      },

      pageLink: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faFileImportSolid : faFileImport} />
          <span>PageLink</span>
        </span>,
        content: () => <div>
          PageLink
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
          Tabs
        </div>
      },

      terms: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faFileSignatureSolid : faFileSignature} />
          <span>Terms</span>
        </span>,
        content: () => <div>
          Terms
        </div>
      },
      
      tooltip: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faCommentAltLinesSolid : faCommentAltLines} />
          <span>Tooltip</span>
        </span>,
        content: () => <div>
          Tooltip
        </div>
      },
    }} />
  </div>;
}

export default DevDocComponentsTab;
