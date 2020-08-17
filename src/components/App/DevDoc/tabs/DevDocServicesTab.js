import React from 'react';
import { faPalette, faDatabase, faCalendar, faExclamationTriangle, faFileImage, faBars, faMap, faWindow, faEye, faLock, faExpandArrowsAlt, faPlay, faClock, faCog, faMicrochip, faWrench, faSun } from '@fortawesome/pro-light-svg-icons';
import { faPalette as faPaletteSolid, faDatabase as faDatabaseSolid, faCalendar as faCalendarSolid,
  faExclamationTriangle as faExclamationTriangleSolid, faFileImage as faFileImageSolid,
  faBars as faBarsSolid, faMap as faMapSolid, faWindow as faWindowSolid, faEye as faEyeSolid,
  faLock as faLockSolid, faExpandArrowsAlt as faExpandArrowsAltSolid, faPlay as faPlaySolid,
  faClock as faClockSolid, faCog as faCogSolid, faMicrochip as faMicrochipSolid,
  faWrench as faWrenchSolid, faSun as faSunSolid } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../../Utils/Icon/Icon';
import Tabs from './../../../Utils/Tabs/Tabs';

const DevDocServicesTab = () => {

  return <div className="DevDocServicesTab">
    <Tabs isHorizontalLayout tabs={{
      color: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faPaletteSolid : faPalette} />
          <span>Color</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faPaletteSolid} /> ColorService</h1>
          <span className="doc-desc">ColorService permits color operations and image color extraction.</span>
          <ul className="doc-tags">
            <li>Color</li>
            <li>Palette</li>
          </ul>
          <h3>Functions</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>getMainColorsOfImage</td><td>image | The image, encoded as data-URI or JS File API</td><td>Extracts and returns the main colors of an image</td></tr>
              <tr><td>getThemeColor</td><td></td><td>Returns the theme color, as hex color. Takes into account the active role as well as settings.</td></tr>
              <tr><td>convertHEXtoRGB</td><td>color | The hex color, as string</td><td>Converts the hex color into an RGB array one.</td></tr>
              <tr><td>convertRGBtoHEX</td><td>color | The RGB color, as array</td><td>Converts the RGB color into an hex string one.</td></tr>
              <tr><td>isDarkColor</td><td>color | The RGB color, as array</td><td>Returns true if the color parameter is a dark color.</td></tr>
              <tr><td>isLightColor</td><td>color | The RGB color, as array</td><td>Returns true if the color parameter is a light color.</td></tr>
              <tr><td>isMedColor</td><td>color | The RGB color, as array</td><td>Returns true if the color parameter is a med color (not too light, not too dark).</td></tr>
              <tr><td>addOpacityToRGB</td><td>color | The RGB color, as array<br/>opacity | float to set opacity</td><td>Returns an RGBA string.</td></tr>
              <tr><td>lightenDarkenColor</td><td>color | The HEX color, as string<br/>amount | amount to lighten the color (or darken if negative)</td><td>Returns an HEX color string.</td></tr>
              <tr><td>buildGradientFromHEX</td><td>color | The HEX color, as string<br/>amount | amount to lighten the color (or darken if negative)</td><td>Returns a linear gradient color string.</td></tr>
              <tr><td>getPaletteForColor</td><td>color | The color identifier from EPalette</td><td>Returns the palette color object (dark, medium, light, veryLight).</td></tr>
            </tbody>
          </table>
          <h3>Other exports</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>EPalette</td><td>Color keys from the palette</td></tr>
              <tr><td>EDarkPaletteDetails</td><td>For each color from EPalette, returns an object containing the css variable, color name and hex color string</td></tr>
              <tr><td>EMediumPaletteDetails</td><td>For each color from EPalette, returns an object containing the css variable, color name and hex color string</td></tr>
              <tr><td>ELightPaletteDetails</td><td>For each color from EPalette, returns an object containing the css variable, color name and hex color string</td></tr>
              <tr><td>EVeryLightPaletteDetails</td><td>For each color from EPalette, returns an object containing the css variable, color name and hex color string</td></tr>
              <tr><td>DEFAULT_THEME_COLOR</td><td>The default purple/blue theme color. Use ColorService.getThemeColor instead for most cases.</td></tr>
              <tr><td>DEFAULT_MAIN_COLOR</td><td>The default pink main color.</td></tr>
              <tr><td>TEXT_COLOR</td><td>The default text color.</td></tr>
              <tr><td>LIGHT_GRAY</td><td>The default light gray color.</td></tr>
              <tr><td>GRAY</td><td>The default gray color.</td></tr>
            </tbody>
          </table>
        </div>
      },
      data: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faBarsSolid : faBars} />
          <span>Data</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faBarsSolid} /> DataService</h1>
          <span className="doc-desc">Used to pre compute data linked to the user (active role, active role company, user details).<br/>
            This data permits to ask the database once and to keep data available every time we need it.<br/>
            Using a singleton pattern, the call of computed data fetch data only the first time, then it keeps it.<br/>
            Utility funcitons are available to invalidate data (for example when the current active role is changed).
          </span>
          <ul className="doc-tags">
            <li>Data</li>
            <li>Singleton</li>
          </ul>
          <h3>Functions</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>computeValues</td><td></td><td>Ask to retrieve and store all computed values</td></tr>
              <tr><td>computed.search</td><td>searchTypeArray | an array of ESearchType<br/>term | The search term, as string<br/>companyId | The related companyId</td><td>Search for entities from [searchTypeArray], linked to [companyId] with the term [term]</td></tr>
              <tr><td>computed.isConnected</td><td></td><td>Returns true if a user is connected</td></tr>
              <tr><td>computed.notifyChanges</td><td></td><td>Notify changes about computer data and request to recompute it</td></tr>
              <tr><td>computed.notifyObservers</td><td></td><td>Notify all observers with the new computed data</td></tr>
              <tr><td>computed.getDefaultComputedValues</td><td></td><td>Returns computed data without related data</td></tr>
              <tr><td>computed.observeComputedValues</td><td>callback | function to be called when changes occur<br/>observerKey | unique observer key</td><td>Adds the callback as observer of computed data.</td></tr>
              <tr><td>computed.unobserveComputedValues</td><td>observerKey | unique observer key</td><td>Removes the related observer callback.</td></tr>
            </tbody>
          </table>
          <h3>Other exports</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>ensureFilledFields(object, fields)</td><td>returns false if any of the [fields] is not or empty in the [object]</td></tr>
              <tr><td>migratePrototype(object)</td><td>returns a copy of [object], without its original prototype</td></tr>
            </tbody>
          </table>
        </div>
      },
      date: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faCalendarSolid : faCalendar} />
          <span>Date</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faCalendarSolid} /> DateService</h1>
          <span className="doc-desc">Several functions to format and process date operations</span>
          <ul className="doc-tags">
            <li>Date</li>
            <li>Calendar</li>
          </ul>
          <h3>Explanation</h3>
          <span className="doc-desc">Manage dates easily. Permits also to format and transform date objects. All dates in databases must be of type ISO string.<br/>They can also be saved along with a timestamp number for fast relative comparisons between dates.</span>
          <h3>Observer-pattern</h3>
          <span className="doc-desc">The DateService follows the observer pattern for dates. Date observer callbacks are called every 20 seconds but without data. It's their role to call another function of DateService that accomodate their needs.</span>
          <h3>Functions</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>getDateFromIsoString</td><td>isoDateString | an iso date string</td><td>Converts an iso date string into a JS date</td></tr>
              <tr><td>getDateFromTimeStampNumber</td><td>timeStampNumber | timestamp as number</td><td>Converts a timestamp number into a JS date</td></tr>
              <tr><td>getCurrentIsoDateString</td><td></td><td>Get current date, as iso date string</td></tr>
              <tr><td>getCurrentDate</td><td></td><td>Get current date</td></tr>
              <tr><td>getCurrentTimeStampNumber</td><td></td><td>Get current date, as timestamp number</td></tr>
              <tr><td>getIsoDateString</td><td>date | a JS date</td><td>Converts the [date] into an iso date string</td></tr>
              <tr><td>getTimeStampNumber</td><td>date | a JS date</td><td>Converts the [date] into a timestamp number</td></tr>
              <tr><td>cloneDate</td><td>date | a JS date</td><td>Returns the cloned [date] object</td></tr>
              <tr><td>addOrRemoveDays</td><td>date | a JS date<br/>amount | The amount of days to add (or remove if negative)</td><td>Returns the modified [date] as cloned object</td></tr>
              <tr><td>getDateTimeString</td><td>date | a JS date<br/>withYear | includes the year<br/>fullDate | Includes a second full string for the date<br/>prefix | Includes a prefix on the date</td><td>Returns a formatted datetime string</td></tr>
              <tr><td>getDateString</td><td>date | a JS date<br/>descriptiveDate | prints 'Today' instead of the date if relevant<br/>withYear | includes the year<br/>prefix | Includes a prefix on the date</td><td>Returns a formatted date string</td></tr>
              <tr><td>getMonthYearString</td><td>date | a JS date</td><td>Returns a formatted date string with month and year only</td></tr>
              <tr><td>getTimeString</td><td>date | a JS date</td><td>Returns a formatted time string</td></tr>
              <tr><td>getDatePartString</td><td>date | a JS date<br/>transformOptions | opitons as specified in Intl Date formats</td><td>Returns a formatted date / date part string</td></tr>
              <tr><td>getTimePartString</td><td>date | a JS date<br/>transformOptions | opitons as specified in Intl Time formats</td><td>Returns a formatted time / time part string</td></tr>
              <tr><td>areDatesTheSameDay</td><td>date1 | a JS date<br/>date2 | another JS date</td><td>Returns true if [date1] and [date2] are pointing at the same day</td></tr>
              <tr><td>isToday</td><td>date | a JS date</td><td>Returns true if the [date] is today</td></tr>
              <tr><td>isYesterday</td><td>date | a JS date</td><td>Returns true if the [date] is yesterday</td></tr>
              <tr><td>isTomorrow</td><td>date | a JS date</td><td>Returns true if the [date] is tomorrow</td></tr>
              <tr><td>getDifference</td><td>date1 | a JS date<br/>date2 | another JS date</td><td>Returns the difference between date1 and date2 in milliseconds</td></tr>
              <tr><td>getTimestampDifference</td><td>ts1 | a timestamp number<br/>ts2 | another timestamp number</td><td>Returns the difference between ts1 and ts2 in milliseconds</td></tr>
              <tr><td>getRelativeDifference</td><td>date | a JS date</td><td>Returns the relative difference of [date] compared to now</td></tr>
            </tbody>
          </table>
        </div>
      },
      error: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faExclamationTriangleSolid : faExclamationTriangle} />
          <span>Error</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faExclamationTriangleSolid} /> ErrorService</h1>
          <span className="doc-desc">Used to manage errors and warnings and responsible of printing user-friendly errors.<br/>Automatic error reporting is being designed.</span>
          <ul className="doc-tags">
            <li>Error</li>
            <li>Catch</li>
          </ul>
          <h3>Explanation</h3>
          <span className="doc-desc">This service is the only point to manage errors. It permits to centralize both error parsing and error throwing.</span>
          <h3>Functions</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>error</td><td>message | The error message<br/>title | The error message's title</td><td>Throw a toast error message</td></tr>
              <tr><td>info</td><td>message | The info message<br/>title | The info message's title</td><td>Throw a toast info message</td></tr>
              <tr><td>success</td><td>message | The success message<br/>title | The success message's title</td><td>Throw a toast success message</td></tr>
              <tr><td>warning</td><td>message | The warning message<br/>title | The warning message's title</td><td>Throw a toast warning message</td></tr>
              <tr><td>clear</td><td></td><td>Removes all toast messages</td></tr>
              <tr><td>manageError</td><td>error | an error object</td><td>Throw a user-friendly error message if the error code is known</td></tr>
              <tr><td>manageErrorThenReject</td><td>error | an error object<br/>reject | an promise reject function</td><td>Throw a user-friendly error message if the error code is known, then calls reject</td></tr>
              <tr><td>manageErrorThenPromiseRejection</td><td>error | an error object</td><td>Throw a user-friendly error message if the error code is known, then returns a Promise.reject result</td></tr>
            </tbody>
          </table>
        </div>
      },
      file: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faFileImageSolid : faFileImage} />
          <span>File</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faFileImageSolid} /> FileService</h1>
          <span className="doc-desc">Used to store documents in the user-space. Firebase Storage provides an efficiant way to restrict user access.<br/>Each user, when signing up, is gived a user storage folder (named by his id). He has the right to read every user space, but can write only to his own space.<br/>This service provides a way to upload files to his user space.</span>
          <ul className="doc-tags">
            <li>File</li>
            <li>Folder</li>
          </ul>
          <h3>Explanation</h3>
          <span className="doc-desc">Files are stored inside Firebase Storage. Their personal files are stored in {'/{userId}/personal'}.<br/>
            The personal file structure is store in {'/{userId}/structure'} file, in its structure metadata property, as {'folderId: { name: \'Name\', parent: { parentFolderId } }'}. If the parentFolderId is null, folder is at root.<br/>
            For each personal file, its name is stored in the metadata realName property, and its folder id in the metadata folder property. If its metadata folder property is null, it means that the file is at root.</span>
          <h3>Observer-pattern</h3>
          <span className="doc-desc">The FileService follows the observer pattern for files. At any time, if a file or file structure is changed, all observers are called with the new files and file structure.</span>
          <h3>Functions</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>getStorageRef</td><td></td><td>Get the Firebase Storage reference</td></tr>
              <tr><td>uploadProfilePhoto</td><td>file | the JS File</td><td>Upload the file reprensenting the profile picture in the current user's space</td></tr>
              <tr><td>getDownloadURLForProfilePicture</td><td></td><td>Get the external URL for the Profile Picture file of the current user</td></tr>
              <tr><td>uploadCompanyLogo</td><td>file | the JS file</td><td>Upload a file representing a company logo</td></tr>
              <tr><td>getDownloadURLForCompanyLogo</td><td>fileRef | the file reference</td><td>Get the publicly available company logo url</td></tr>
              <tr><td>getPersonalFiles</td><td></td><td>Get all personal files in the current user's space</td></tr>
              <tr><td>getStructure</td><td></td><td>Get the user's space folder sturcture</td></tr>
              <tr><td>updateStructure</td><td>newStructure | The new structure that will replace the old one<br/>isNotify | do we have to notify observers with the new structure?</td><td>Update the user's space structure. If [isNotify] is true, update observers with the new structure once updated.</td></tr>
              <tr><td>getFilesForNode</td><td>node | The folderId</td><td>Returns all files that are directly in the [node]. The [node] can be null (= root). /!\ The file structure must already have been loaded.</td></tr>
              <tr><td>uploadFile</td><td>file | the JS file<br/>node | The folder id<br/>isNotify | Do we have to notify observers?</td><td>Upload the [file] in the [node]. Then notify observers if [isNotify] is true.</td></tr>
              <tr><td>getImageDimensions</td><td>file | the JS file</td><td>Returns the [file] image dimensions.</td></tr>
              <tr><td>uploadFiles</td><td>files | the JS files<br/>node | the parent folderId</td><td>Upload all [files] into the same [node]. Then, notify for changes</td></tr>
              <tr><td>renameFile</td><td>file | the file object<br/>newName | the file's new name</td><td>Change the [file]'s metadata realName property to the [newName].</td></tr>
              <tr><td>getActionsForFile</td><td>file | the file object</td><td>Returns an action object with all possible actions for this [file]</td></tr>
              <tr><td>deleteFile</td><td>file | the file object<br/>isNotify | do we have to notify observers about this deletion?</td><td>Deletes the [file], then notify observers if [isNotify] is true</td></tr>
              <tr><td>getFoldersForNode</td><td>node | the folder id</td><td>Returns all child folders relative to this [node].</td></tr>
              <tr><td>createFolder</td><td>parent | the parent folder id<br/>name | the new folder's name</td><td>Creates a folder in the [parent] folder, with the [name]. Provides null as [parent] to be at root.</td></tr>
              <tr><td>renameFolder</td><td>folderKey | the concerned folder id<br/>newName | the folder's new name</td><td>Rename the folder with [folderKey] with the [newName].</td></tr>
              <tr><td>getActionsForFolder</td><td>folderKey | the concerned folder id</td><td>Returns the action object with all possible actions on the folder [folderKey].</td></tr>
              <tr><td>deleteFolder</td><td>folderKey | the concerned folder id</td><td>Delete the folder along with all children folders and files. Don't provide anything for the [isInitial] parameter, it is only used for recursion.</td></tr>
              <tr><td>getQuota</td><td>files | all or part of user's files</td><td>Returns stats on how many space is occupied by this [files].</td></tr>
              <tr><td>getDetailsForFile</td><td>file | a file object</td><td>Returns details (icon, type, safe and render method) on the [file].</td></tr>
              <tr><td>getReadableSize</td><td>size | a file size, as number</td><td>Returns the formatted [size].</td></tr>
            </tbody>
          </table>
          <h3>Other exports</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>QUOTA_FOR_USER</td><td>The byte quota for all users</td></tr>
            </tbody>
          </table>
        </div>
      },
      firebase: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faDatabaseSolid : faDatabase} />
          <span>Firebase</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faDatabaseSolid} /> FirebaseService</h1>
          <span className="doc-desc">This service is used to initialize global Firebase objects, as well as providing user authentication functions.</span>
          <ul className="doc-tags">
            <li>Firebase</li>
            <li>API</li>
          </ul>
          <h3>Functions</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>initialize</td><td></td><td>Initialize all connections to Firebase services</td></tr>
              <tr><td>getFirebaseObject</td><td></td><td>Returns the global Firebase object.</td></tr>
              <tr><td>signIn</td><td>email | a user email<br/>password | a user email</td><td>Tries to signin the user</td></tr>
              <tr><td>signUp</td><td>email | a user email<br/>password | a user email</td><td>Tries to signup a new user</td></tr>
              <tr><td>updateUser</td><td>userProps | the new user properties</td><td>Updates the user properties</td></tr>
              <tr><td>signOut</td><td></td><td>Sign out the current user</td></tr>
              <tr><td>getCurrentUser</td><td></td><td>Get the currently connected user, or null if no one is connected.</td></tr>
              <tr><td>isUserConnected</td><td></td><td>Returns true if a user is connected</td></tr>
              <tr><td>getFirestore</td><td></td><td>Returns the global Firestore object to interact with this service.</td></tr>
              <tr><td>getRtDb</td><td></td><td>Returns the global RT database object to interact with this service</td></tr>
            </tbody>
          </table>
        </div>
      },
      geo: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faMapSolid : faMap} />
          <span>Geo</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faMapSolid} /> GeoService</h1>
          <span className="doc-desc">Used to store third-party tile layers configurations (from Bing, CartoDB...)<br/>as well as giving access to utility functions (data coordinates transformation, bounding boxes computes...)</span>
          <ul className="doc-tags">
            <li>Geo</li>
            <li>Map</li>
            <li>Marker</li>
            <li>Location</li>
          </ul>
          <h3>Functions</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>computeBoundingBox</td><td>markers | The related markers<br/>margin | the margin between markers and map borders (default .5)</td><td>Returns a BBox that encapsulated all [markers].</td></tr>
              <tr><td>transformCoordinates</td><td>lonLat | a LonLat pointer</td><td>Transform the [lonLat] point to EPSG:3857 coordinates, standard used all over the app.</td></tr>
              <tr><td>searchPlaces</td><td>searchString | the search term<br/>options | Nominatim options</td><td>Search for places. Debounce the calls!</td></tr>
              <tr><td>getApproximateLocation</td><td></td><td>Get the approximate location of the user. Does not use the browser's Location API.</td></tr>
            </tbody>
          </table>
          <h3>Other exports</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>MarkerStyles</td><td>All common marker styles.</td></tr>
              <tr><td>TileLayersDetails</td><td>All tile layer details, along with key, name, layer, attributions and image preview.</td></tr>
            </tbody>
          </table>
        </div>
      },
      modal: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faWindowSolid : faWindow} />
          <span>Modal</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faWindowSolid} /> ModalService</h1>
          <span className="doc-desc">Launching modals and listening from user events in modals are never been so simple with this service.</span>
          <ul className="doc-tags">
            <li>Modal</li>
          </ul>
          <h3>Explanation</h3>
          <span className="doc-desc">Never call the {'<Modal />'} component directly. Instead, use this service!</span>
          <h3>Functions</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>showModal</td><td>title | modal's title<br/>content | modal's content (HTML)<br/>options | modal's options<br/>options.noClose | User must make a choice and click on one action<br/>options.actions | the modal's action array<br/>callback | function called when an action is clicked by the user</td><td>Show a modal.</td></tr>
              <tr><td>rerender</td><td></td><td>Ask to rerender the modal because some parameters have changed.</td></tr>
            </tbody>
          </table>
        </div>
      },
      observer: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faEyeSolid : faEye} />
          <span>Observer</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faEyeSolid} /> ObserverService</h1>
          <span className="doc-desc">Service only used by other services to add an observer pattern along with its functionalities.</span>
          <ul className="doc-tags">
            <li>Observer</li>
            <li>Pattern</li>
          </ul>
          <h3>Explanation</h3>
          <span className="doc-desc">The Observer service implement a multi-channel Observable-Observer pattern. Each Observer comes with its channel and callback function.</span>
          <h3>Functions</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>initialize</td><td>obj | parent of observer functionalities.<br/>type | unique identifier of the observer. Acts as channel name<br/>options | observer's options<br/>options.startWatcher | If a watcher is needed, this function is called when at least an observer is registered<br/>options.stopWatcher | called when there is no observer anymore<br/>options.computeChanges | compute changes to data, then save it<br/>getData | returns the computed saved data</td><td>Initlialize an observer pattern in the provided [obj].</td></tr>
            </tbody>
          </table>
        </div>
      },
      permission: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faLockSolid : faLock} />
          <span>Permission</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faLockSolid} /> PermissionService</h1>
          <span className="doc-desc">Used to ask specific permissions from the browser, like location.<br/>Using the observer pattern, every location listener is called at the same time when the user's position is changed.</span>
          <ul className="doc-tags">
            <li>Permission</li>
            <li>Browser APIs</li>
          </ul>
          <h3>Observer Pattern</h3>
          <span className="doc-desc">The location is observed and you can register an observer when it changes.</span>
          <h3>Explanation</h3>
          <span className="doc-desc">For the moment, only location permission is managed.</span>
          <h3>Functions</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>location.askPermission</td><td></td><td>Ask the location permission. Mandatory before calling getLocation</td></tr>
              <tr><td>location.getLocation</td><td></td><td>Returns the user's location</td></tr>
            </tbody>
          </table>
        </div>
      },
      resize: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faExpandArrowsAltSolid : faExpandArrowsAlt} />
          <span>Resize</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faExpandArrowsAltSolid} /> ResizeService</h1>
          <span className="doc-desc">Service that uses the observer pattern to call every listener that needs to know when the window has been moved or resized.<br/>Useful for components that cannot be developed with CSS responsiveness in mind (Map for example).</span>
          <ul className="doc-tags">
            <li>Resize</li>
          </ul>
          <h3>Observer Pattern</h3>
          <span className="doc-desc">The window size is observed and you can register an observer when it changes.</span>
          <h3>Variables</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>size</td><td>Window size</td></tr>
            </tbody>
          </table>
        </div>
      },
      right: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faPlaySolid : faPlay} />
          <span>Right</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faPlaySolid} /> RightService</h1>
          <span className="doc-desc">Provides a utility functions that check if a user has a specific right.<br/>It stores right dependency tree as well.</span>
          <ul className="doc-tags">
            <li>Rights</li>
          </ul>
          <h3>Functions</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>hasAppRight</td><td></td><td>Returns true if the current user is allowed to access this part of the app.</td></tr>
            </tbody>
          </table>
        </div>
      },
      rt: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faClockSolid : faClock} />
          <span>RT</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faClockSolid} /> RT_Service</h1>
          <span className="doc-desc">Provides functionalities to the Real-Time database.</span>
          <ul className="doc-tags">
            <li>Real-Time</li>
            <li>Database</li>
          </ul>
          <h3>Observer Pattern</h3>
          <span className="doc-desc">The RT_Service implements an observer pattern for the RT Messages. Each observer is called when a RT message is new, updated or deleted.</span>
          <h3>Functions</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>user.*</td><td></td><td>CRUD on User RT Messages.</td></tr>
              <tr><td>company.*</td><td></td><td>CRUD on Company RT Messages.</td></tr>
              <tr><td>role.updateRole</td><td>role | The role from ERole<br/>companyId | The related companyId</td><td>Modify the user's active role in the RT Database.</td></tr>
              <tr><td>role.resetRole</td><td></td><td>Reset the role to no role inside the RT database.</td></tr>
              <tr><td>initialize</td><td></td><td>Initialize the RT_Service with its connections to the database.</td></tr>
            </tbody>
          </table>
        </div>
      },
      settings: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faCogSolid : faCog} />
          <span>Settings</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faCogSolid} /> SettingsService</h1>
          <span className="doc-desc">Used to store, retrieve and print settings.</span>
          <ul className="doc-tags">
            <li>Settings</li>
          </ul>
          <h3>Functions</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>getSettingValue</td><td>settingKey | A setting key from ESettings</td><td>Retrieve the value of this settings for the current user. If no value is found, return the default setting value.</td></tr>
              <tr><td>updateSetting</td>settingKey | A setting key from ESettings<br/>settingValue | The new value for this setting<td></td><td>Set the value of this setting for the current user.</td></tr>
            </tbody>
          </table>
          <h3>Other exports</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>ESettings</td><td>All setting keys.</td></tr>
              <tr><td>ESettingsDetails</td><td>Details for each setting, along with its title, options, default value.</td></tr>
            </tbody>
          </table>
        </div>
      },
      userAgent: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faMicrochipSolid : faMicrochip} />
          <span>User Agent</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faMicrochipSolid} /> UserAgentService</h1>
          <span className="doc-desc">Retrieve all information relative to user's device.</span>
          <ul className="doc-tags">
            <li>UserAgent</li>
            <li>Device</li>
          </ul>
          <h3>Functions</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>copyToClipboard</td><td>text | The text to copy to clipboard</td><td>Copy the [text] to the user's clipboard.</td></tr>
              <tr><td>getAll</td><td></td><td>Get all serializable information from user's device.</td></tr>
              <tr><td>getAppVersion</td><td></td><td>Get LogTrack version.</td></tr>
              <tr><td>getReactVersion</td><td></td><td>Get used React version.</td></tr>
              <tr><td>isMobile</td><td></td><td>Returns true if the user is on mobile.</td></tr>
              <tr><td>isCookiesEnabled</td><td></td><td>Returns true if cookies are enabled.</td></tr>
              <tr><td>getBrowserInfos</td><td></td><td>Returns browser agent information.</td></tr>
              <tr><td>parseBrowserInfos</td><td>browserInfos | object returned by getBrowserInfos</td><td>Returns readable browser information.</td></tr>
              <tr><td>parseOS</td><td>browserInfos | object returned by getBrowserInfos</td><td>Returns readable operating system information.</td></tr>
              <tr><td>getNbTouchpoints</td><td></td><td>Returns the number of touchpoints for the screen.</td></tr>
              <tr><td>isTactile</td><td></td><td>Returns true if the screen is tactile.</td></tr>
              <tr><td>getScreenProperties</td><td></td><td>Returns screen information.</td></tr>
              <tr><td>getConnection</td><td></td><td>Returns internet connection information.</td></tr>
              <tr><td>getLanguage</td><td></td><td>Returns browser language information.</td></tr>
              <tr><td>getMemory</td><td></td><td>Returns memory information.</td></tr>
              <tr><td>getMemoryUsage</td><td></td><td>Returns memory usage information.</td></tr>
              <tr><td>getNbThreads</td><td></td><td>Returns the number of threads that the processor is capable.</td></tr>
              <tr><td>getPlugins</td><td></td><td>Returns the browser plugins.</td></tr>
            </tbody>
          </table>
        </div>
      },
      utils: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faWrenchSolid : faWrench} />
          <span>Utils</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faWrenchSolid} /> UtilsService</h1>
          <span className="doc-desc">Many generic functionalities.<br/>More utility functions to manage arrays, JS events and strings.</span>
          <ul className="doc-tags">
            <li>Utils</li>
          </ul>
          <h3>Observer Pattern</h3>
          <span className="doc-desc">The UtilsService.url is an observer pattern on URL.</span>
          <h3>Functions</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>getUrlGetParam</td><td>paramKey | The GET parmater key</td><td>Get the value of a GET parameter from the URL.</td></tr>
              <tr><td>capitalize</td><td>str | the string to capitalize</td><td>The capitalized string.</td></tr>
              <tr><td>removeDuplicateFromArray</td><td>array | the input array</td><td>The array, with duplicates removed.</td></tr>
              <tr><td>filterKeysOnPropertyValue</td><td>obj | the input object<br/>predicate | the filter predicate function</td><td>The keys corresponding to properties for which the predicate returned true.</td></tr>
              <tr><td>filterObjectsOnPropertyValue</td><td>obj | the input object<br/>predicate | the filter predicate function</td><td>The object, with all properties for which the predicate returned true.</td></tr>
              <tr><td>filterKeyValueOnPropertyValue</td><td>obj | the input object<br/>predicate | the filter predicate function</td><td>The object without its prototype, with all properties for which the predicate returned true.</td></tr>
              <tr><td>mergeObjects</td><td>...obj | the object list</td><td>One object with all input object properties.</td></tr>
              <tr><td>compareArrays</td><td>arr1 | an array<br/>arr2 | another array</td><td>Compare arrays, return false if a difference of value, or in nested array is detected.</td></tr>
              <tr><td>compareFn</td><td>val1 | a value<br/>val2 | another value</td><td>Compare function to sort arrays.</td></tr>
              <tr><td>flattenObject</td><td>ob | the object to flatten</td><td>The flatten object (all nested properties are at root).</td></tr>
              <tr><td>usePrevious</td><td>value | the new value</td><td>A hook that memorize values, with always a value late.</td></tr>
            </tbody>
          </table>
          <h3>Other exports</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>ASSETS_URL</td><td>The endpoint to load all LogTrack assets.</td></tr>
            </tbody>
          </table>
        </div>
      },
      weather: {
        name: ({ isActive }) => <span>
          <Icon source="fa" icon={isActive ? faSunSolid : faSun} />
          <span>Weather</span>
        </span>,
        content: () => <div>
          <h1><Icon source="fa" icon={faSunSolid} /> WeatherService</h1>
          <span className="doc-desc">Used to interact with OpenWeather API endpoints to get the weather at user's location.</span>
          <ul className="doc-tags">
            <li>Weather</li>
          </ul>
          <h3>Functions</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>getWeather</td><td>lon | The user's longiture<br/>lat | The user's latitude</td><td>Returnes the weather via OpenWeather, encapsulated into a promise.<br/>Also, save it into the database if another call with the same lat and lon is triggered a bit later.</td></tr>
            </tbody>
          </table>
          <h3>Other exports</h3>
          <table className="doc-props" border="1">
            <thead><tr><th>Name</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td>EWeatherIcons</td><td>Converts the OpenWeather icon codes into Font Awesome icons.</td></tr>
            </tbody>
          </table>
        </div>
      }
    }} />
  </div>;
}

export default DevDocServicesTab;
