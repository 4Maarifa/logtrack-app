import React from 'react';

import { EBrandDetails } from './../../../classes/enums/EBrand';

import './Terms.scss';

/**
 * Component: Terms
 * Used by Profile and Splash
 * Show terms and conditions of LogTrack
 */
const Terms = () => {

  /**
   * RENDER
   */
  return <div className="Terms">
    <h1>Terms</h1>
    <span className="sub">Last Updated: 21, Aug 2020</span>
    <ol>
      <li>
        <span className="title">Contact and Questions</span>
        <span>If you have any question regarding these Terms of Use, please contact Us using <a href="https://logtrack.app/contact">https://logtrack.app/contact</a></span>
      </li>
      <li>
        <span className="title">Interpretation</span>
        <span>
          The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
        </span>
      </li>
      <li><span className="title">Definitions</span></li>
      <ol>
        <li>'Terms', 'Conditions' refers to this document</li>
        <li>'Bertrand Choubert', 'The Developer' refers to the developer and maintainer of LogTrack, whose website is accessible from <a href="https://chbe.fr">https://chbe.fr</a></li>
        <li>'LogTrack', 'We', 'Our', 'the Service', 'the Website', 'the Site' refers to the website accessible from <a href="https://logtrack.app">https://logtrack.app</a></li>
        <li>'You', 'The user', 'User' means the individual accessing or using the Service</li>
        <li>'The customer company', 'The client', 'The client company' refers to the legal entity on behalf a User is accessing or using the Service</li>
        <li>'Firebase' refers to the legal entity that manages <a href="https://firebase.google.com">https://firebase.google.com</a>, its affiliates and its services</li>
        <li>'Google', 'Google Cloud', 'Google Cloud Platform' refers to the legal entity that manages <a href="https://cloud.google.com/">https://cloud.google.com/</a>, its affiliates and its services</li>
        <li>'OVH' refers to the legal entity that manages <a href="http://ovh.com/">http://ovh.com/</a>, its affiliates and services</li>
      </ol>
      <li><span className="title">Agreement</span></li>
      <ol>
        <li>These Terms and Conditions of Use apply to the LogTrack website, and all associated sites linked to <a href="https://logtrack.app">https://logtrack.app</a> by LogTrack and affiliates, including LogTrack websites around the world. The Service is the property of Bertrand Choubert.<br/>
          BY USING THE SITE (The 'Service'), YOU AGREE TO THESE TERMS OF USE. IF YOU DO NOT AGREE, DO NOT USE THE SITE.
        </li>
        <li>LogTrack reserves its rights, as its sole discretion, to change, modify, add or remove portions of these Terms of Use at any time. It's your responsability to check these Terms of Use periodically.<br/>
          LogTrack may provide signed-in users when important changes appear, either via email or popup on sign-in, but has no legal obligation and responsability to do so.<br/>
          Your continued use of LogTrack following the posting of changes will mean that You accept and agree to the changes. As long as You comply with these Terms of Use, LogTrack grants You a non-exclusive and non-transferable right to enter and use the Service.</li>
      </ol>
      <li><span className="title">Content</span></li>
      <ol>
        <li>All text, graphics, user interfaces, visual interfaces, trademarks, logos, sounds, artwork and computer code, including but not limited to the design, structure, coordination, "look and feel" and layout of such content contained on the Site is owned, controlled or licensed to Bertrand Choubert, and is protected by copyright, patent, trademark laws and author's rights.</li>
        <li>Except as expressly mentioned in these Terms of Use, no part of the Site may be copied, reproduced, republished, uploaded, posted, publicly displayed, translated, distributed in any way without Bertrand Choubert's prior written consent to do so.</li>
        <li>List of Content items that are NOT exclusively licensed or used by Bertrand Choubert include, but does not limit, to:</li>
        <ul>
          <li>Main Page video (top-view of an intersection) from Tom Fisk and Pexels (<a href="https://www.pexels.com/">https://www.pexels.com/</a>) from this link: <a href="https://www.pexels.com/video/from-above-footage-of-vehicular-traffic-on-a-busy-street-intersection-in-the-city-at-night-3063475/">https://www.pexels.com/video/from-above-footage-of-vehicular-traffic-on-a-busy-street-intersection-in-the-city-at-night-3063475/</a><br/>
            This asset's utilization on LogTrack complies with Pexel's license: <a href="https://www.pexels.com/license/">https://www.pexels.com/license/</a></li>
          <li>The equipment's pictures and names are used for illustration purposes and companies that produces them are still the exclusive owner of these assets, as specified in the 'Related Companies' part of these Terms of Use.</li>
          <li>The Font Awesome icons are used under both 'Font Awesome Pro Standard' and 'Personal + Small Business' licenced as non-exclusive license, to Bertrand Choubert, for his personal and commercial uses</li>
          <li>The 'transportation-font', developed by Bertrand Choubert</li>
        </ul>
        <li>In the contrary, LogTrack assets include, but does not limit to:</li>
        <ul>
          <li>The name 'LogTrack', created by Bertrand Choubert</li>
          <li>The three main logos: 'LT' (or Simplified Logo), 'LogTrack' (or Full-Size Logo), and 'LogTrack.app' (or Website Logo) and corresponding assets are copyrighted and owned by Bertrand Choubert</li>
          <li>LogTrack's code, icons, documentation, layout, color choice, components that are part of the application, components that are part of the 'common library'</li>
          <li>The logo animation is made by Bertrand Choubert and protected by author's rights</li>
          <li>The bluish / purplish color #113885 is associated with and identify LogTrack and may not be reused elsewhere</li>
          <li>All the LogTrack code, in exception of libraries (detailed in the 'Libraries and Code assets' section), is produced by Bertrand Choubert, and therefore, is protected by author's rights</li>
        </ul>
      </ol>
      <li><span className="title">User, Real Identity, Online Presence, Responsabilities and Saved Information</span></li>
      <ul>
        <li>The creation of an account on LogTrack permits You to use all LogTrack's functionalities, including interactions with other entities and users.<br/>
          By signing up, a public profile and professional profile, accessible by every other signed in user, are created. All the information on these profiles are the responsability of the User.</li>
        <li>The User also agree that he uses the community tools at his own risk and both LogTrack and Bertrand Choubert cannot be responsible or liable of any data and posts or any other data generated by other Users.</li>
        <li>In addition to that, LogTrack monitors, saves, analyses and uses the User's actions to engage the User's responsability in case of a dispute. Any of this data is used in another way that protection and security.<br/>
          You have all responsability about the content (included, but not limited to files, images, logos, names, text, information) you share on the Service, and all the data generated by the User's actions and how You use the Service.<br/>
          LogTrack can, on behalf of Legal Institutions, ask You to send proof of your real identity, such as Identity Card photo, Driving License, Work Contract etc. if a conflict between You and LogTrack / another User / Customer Company / Legal Institution appears.
          These documents are not hosted, are only used for this purpose, are shared only with concerned entities, and are deleted in the following thirty (30) days after the dispute resolution.</li>
        <li>LogTrack may deliver Your saved information to any government or related organization if it's legally forced to do so.</li>
        <li>All this content, generated by the User, is moderated. The User can contact the moderation via the support page, if any data, generated by another User, a Customer Company, LogTrack or another entity annoy him by any way. We think privacy and security first.<br/>
          Any data (image, text, links or others) that can be judged as knowingly false, defamatory, libellous, inaccurate, discriminatory, abusive, extremist, hateful, harassing, pornographic, obscene, profane, sexually oriented, offensive, racist, homophobic, ageist, threatening, invasive of a person's privacy, in contravention of confidentiality or violating any law may be deleted immediately and without notice.<br/>
          The corresponding User's account may be suspended immediately and without any notice.<br/>
          LogTrack cannot engage its responsability (commercial or not) nor the one of Bertrand Choubert about the consequences of these deletions.</li>
        <li>LogTrack and Bertrand Choubert cannot be responsible for a misuse of the Service and its physical, commercial, personal or other consequences.</li>
        <li>Any User that tries to get arround security protections may be banned immediately and without any notice. Also Bertrand Choubert has the right to sue this User and its legal representant, as planned by the law.</li>
        <li>Any User, even if his account become inoperant, suspended, closed or not usable, is still responsible regarding LogTrack, Bertrand Choubert, other Users and Law and evidence of misusage of LogTrack may be saved until any dispute is resolved.</li>
      </ul>
      <li><span className="title">Digital Signature</span></li>
      <ol>
        <li>By Using LogTrack, in particular by signing up, signing in, creating a Company, proposing or accepting a role, switching role, creating an equipment, contracting, invoicing, you implicitely accept the use of Digital Signature with below terms.</li>
        <li>Objective of the Digital Signature:
            The use of Digital Signature is mandatory and permits Us to identify you and your actions as an individual and engage your personal responsability. If you do not agree to use the Digital Signature, please do not use the Service.</li>
        <li>Any Digital Signature may be saved up to the User account lifetime + ninety (90) days + dispute resolutions, if any, and may engage his responsability, even after his account was closed / suspended.</li>
      </ol>
      <li><span className="title">Customer-Company Actions</span></li>
      <ul>
        <li>All Users, on LogTrack, have the possibility to create a Customer Company, or having a role (by requesting a role or being offered a role) in a Customer Company.<br/>
          By Creating a Customer Company, the User engages his responsability and ensures he is a legal representant of this company. LogTrack may request a proof (either a work contract or certificate of the CEO) that You, the User, can legally represent this Customer Company on LogTrack</li>
        <li>All actions of the User, when having an active role on a Customer Company, may be monitored and saved for further uses, either by LogTrack or other Users of this Customer Company.<br/>
          The deletion of such role, activity or Customer Company, because it violates the Terms in 'User, Real Identity, Online Presence, Responsabilities and Saved Information' section, cannot involve any pursuit of LogTrack and its representants. LogTrack and Bertrand Choubert responsabilities cannot be involved in such case.<br/>
          The Users that either manage or have created the Customer Company have the responsability of managing the User roles provided by LogTrack. Therefore, they are responsible of all Customer Company's actions, including by not limited of proposing / accepting / modifying Customer Company's assets, such as Contracts, Existing and new Roles, Equipments, Invoices, Warehouses.</li>
      </ul>
      <li><span className="title">Libraries and Code Assets</span></li>
      <ol>
        <li>LogTrack uses several libraries and code assets to provide a powerful, secure, and user-friendly experience. The full list of these libraries can be accessed via the LogTrack Github organization: <a href="https://github.com/LogTrack/">https://github.com/LogTrack/</a></li>
        <li>In accordance to the EU reulation, LogTrack and Bertrand Choubert do the maximum to limit security flaws of all code involved. Yet, their responsability cannot be engaged.</li>
      </ol>

      <li><span className="title">Security, Data &amp; Hosting</span></li>
      <ol>
        <li>LogTrack uses third-party services to host and save all the data. Therefore, LogTrack is not directly responsible of data storage.</li>
        <li>Both Google and Google Cloud, which terms are available here: <a href="https://cloud.google.com/product-terms/">https://cloud.google.com/product-terms/</a>, provides LogTrack with Firebase functionalities, which terms are available here: <a href="https://firebase.google.com/terms/">https://firebase.google.com/terms/</a></li>
        <li>In accordance with the law, LogTrack and Bertrand Choubert make the maximum possible to use the last and most secure libraries available. 
          If any security flaws are discovered in one of the above services, LogTrack is not responsible of any security breach if no other option is available and if Google and/or Firebase have not publicly published any security corrections, or not forced to apply them as well as if Bertrand Choubert is not informed by Google about them.</li>
        <li>Also, LogTrack and Bertrand Choubert grant that they use the most secure option available and all avaiable possibilities from Google and its products to secure the data.
          Yet, if a security breach is discovered, either via the Google Products or via the implementation of LogTrack, Bertrand Choubert's responsability cannot be engages and cannot be liable for this.</li>
        <li>The LogTrack website is hosting on Firebase Hosting, a service from Google. The domain name 'LogTrack.app' is from OVH.</li>
        <li>LogTrack and Bertrand Choubert are also not responsible for any security flaws inherant or caused by the User's device.</li>
      </ol>

      <li><span className="title">Personal Data access &amp; modification</span></li>
      <ol>
        <li>In accordance to the CNIL (<a href="https://www.cnil.fr/">https://www.cnil.fr/</a>), You have the right to access, modify, delete any data generated directly or indirectly on LogTrack.<br/>
          To access your data, once connected, head to Profile {'>'} Data or click on this link: <a href="http://localhost:3000/profile?tab=data">http://localhost:3000/profile?tab=data</a>.</li>
          <li>To modify or delete your Data, contact LogTrack via the support page or via <a href="http://localhost:3000/profile?tab=support">http://localhost:3000/profile?tab=support</a> to contact Us and exprim your rights.<br/>
          Be aware that Your data, as explained on the above page, may be incomplete. Some of the data You generated, but for which You cannot be identified, may not be available to delete. Also, some of your actions may not be monitored as Yours. Therefore, We and other parties may be unable to identify You as the creator of some of the data You generated.</li>
      </ol>

      <li><span className="title">Cookies</span></li>
      <ol>
        <li>Some cookies are generated and used directly by LogTrack. These cookies are used for performance, identification, authentication, security and other uses. If you do not agree to these uses, please do not use the Service.</li>
        <li>Some other cookies may be used directly by Firebase, Analytics and/or Google products. LogTrack is not responsible of these uses. Also, if you do not agree to these uses, please do not use the Service.</li>
      </ol>

      <li><span className="title">Public Kit</span></li>
      <ul>
        <li>If you want to communicate publicly about LogTrack, please use the public kit available here: <a href="https://logtrack.app/dev-doc?tab=identity">https://logtrack.app/dev-doc?tab=identity</a></li>
      </ul>

      <li><span className="title">Minor Protection</span></li>
      <ol>
        <li>By using LogTrack, a User grants he is 18 years old or more, and that he is major and is legally responsible in his country of residence.</li>
        <li>Any account that may be linked to a minor person may be suspended immediately. We (LogTrack and Bertrand Choubert) cannot be taken responsible for any consequence of this action.</li>
      </ol>

      <li><span className="title">Subscription</span></li>
      <ol>
        <li>LogTrack is free to use for all Users and for all functionalities, except Customer Company operation.</li>
        <li>LogTrack uses a Subscription mechanism. Each month (thirty - 30 days), an invoice is sent both via the Service and via email to the company's creator. Its price is determined both by the current plan and by the real uses of the Customer Company's assets and employees (Users that have a role in that Customer Company)</li>
        <li>LogTrack and Bertrand Choubert cannot be responsible of any unpaid invoice and the consequences if the User did not know an invoice had to be paid due, but not limited to: incorrect email address, invoice email that is in the spam, User that did not visit the LogTrack invoice view, unfinished payement.</li>
        <li>All invoices are due up to a three-month period (90 days). If an invoice is still not paid 90 days after its issuance, an additional email is sent and a 2 week grace period (14 days) is accorded without any price increase. After that, the Customer Company's assets may be disabled / deleted, and all Employees may not be able to use the Customer Company's assets anymore until the dispute resolution.</li>
        <li>In that case, LogTrack and Bertrand Choubert cannot be responsible of any loss (commercial, information, partner and others) and cannot be sued for these actions and consequences.</li>
        <li>The Customer Company's creator, or any of its managers, can decide to regularize the situation by contacting LogTrack and pay the invoice + the price increase due to the delay, that is calculated in accordance to the law. Only when the invoice is paid, and the money collected by the Service, the Customer Company's assets are unlocked and can be used again.</li>
        <li>By creating a Customer Company, the creator must choose a subscription plan, as described in Pricing: <a href="http://localhost:3000/pricing">http://localhost:3000/pricing</a>. All prices are indicated without VAT, and may be changed without any notice. By selecting a plan, the User become a legal Customer of the Service and therefore, has to pay his invoices to the Service in the accorded delay,
          and have the right to interrupt its subscription by contacting Us and returning to the free plan. He assumes all responsability to do so, and all consequences of losing functionalities. LogTrack and Bertrand Choubert are not responsible of any loss due to the User choice to downgrade its plan.</li>
        <li>The User is informed and can verify at any moment the current price of its Customer Company plan, and therefore is engaged to pay the consequent and sub-consequent bills, even if the price increases.
          In this last case, if an invoice is received by the User and he disagrees about the price increase, he has thirty (30) days to contact LogTrack and downgrade to the free plan.
          The last and disputed invoice is cancelled. This cancellation is only on the last and disputed invoice and does not disengage the User about his responsability to pay its past and future invoices.</li>
        <li>If the User chooses to upgrade his Customer Company plan to a charged plan or more expensive plan, he will receive two (2) invoices for the current month: one for the first part of the month for the initial plan, and one for the second part of the month on the new plan.<br/>
          In accordance to the law, prices are computed proportionally to the billable days before and after his choice to upgrade. Every invoice is still disputable on the first thirty (30) days after issuing.</li>
      </ol>

      <li><span className="title">Limited Responsability &amp; Legal Representation</span></li>
      <ol>
        <li>If any or all of LogTrack functionalities become inoperant, due to LogTrack, Bertrand Choubert, or Google, Bertrand Choubert and LogTrack cannot be taken responsible of such and are not responsible of any consequence.
          The provided functionalities list, as described in Pricing is given as information and does not engage LogTrack nor Bertrand Choubert to provide them at any time in the past, present and future.
          Bertrand Choubert and LogTrack are also not responsible of the consequences of such problem and its consequences, in particular but not limited to some data that may become inaccessible.</li>
        <li>Both LogTrack and Bertrand Choubert have a limited responsability on the data, actions, and data that provide from inactions of the User. The User responsability is engaged, even if no Digital Signature is involved, and only as described in the corresponding articles of law.</li>
        <li>As LogTrack is created, maintained and operated in France, only the French law and applicable EU regulations are effective.
          However, Terms of Data Storage, Website hosting, and all other services provided by Google and any other third-party companies may indicate the contrary and the User is also responsible of his actions and their consequences on these services.</li>
        <li>Only French law courts are viable and qualified to judge Bertrand Choubert regarding his limited responsabilities on LogTrack and his Users.</li>
        <li>LogTrack and Bertrand Choubert are not responsible of any technical and non technical information, that may be false, inaccurate, or biased, and any of the consequences.</li>
      </ol>

      <li><span className="title">Related Companies</span></li>
      <ol>
        <li>All below companies, in addition to companies that are in 'Libraries and Code Assets', are implicitely or explicitely linked to LogTrack. Their assets (including, but not limited to: logos, infographics, photos, colors) are used as part of a fair use agreement.<br/>
          If you are a legal representant of one of this company and want to contact Us regarding copyright, misuses or other cause, go to <a href="https://logtrack.app/contact">https://logtrack.app/contact</a>.</li>
        <ul className="flow">
          {Object.keys(EBrandDetails).map(k => <li key={k} style={{ borderColor: EBrandDetails[k].color }}>
            <a href={EBrandDetails[k].website}>{EBrandDetails[k].name}</a>
          </li>)}
        </ul>
      </ol>
      <li><span className="title">Additional Protection</span></li>
      <ul>
        <li>LogTrack and its functionalities are protected under multiple third-party services, such as, but limited to:</li>
        <li>French author's rights</li>
        <li>
          <a href="//www.dmca.com/Protection/Status.aspx?ID=0bab22c0-9685-4971-8bb5-90e6195b6e4b" title="DMCA.com Protection Status" class="dmca-badge">
            <img src ="https://images.dmca.com/Badges/dmca-badge-w150-5x1-08.png?ID=0bab22c0-9685-4971-8bb5-90e6195b6e4b"  alt="DMCA.com Protection Status" />
          </a>
          <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"></script>
        </li>
      </ul>
    </ol>
  </div>;
};

export default Terms;
