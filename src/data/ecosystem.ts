export interface EcosystemOrg {
  name: string;
  /** Short relationship label shown under the name. */
  role: string;
  /** Initials shown in the badge in place of a logo. */
  initials: string;
}

// Organisations named on the About page. Add colleges here as campus chapters come on board.
export const ECOSYSTEM_DATA: EcosystemOrg[] = [
  { name: 'GirlScript Foundation', role: 'Parent organisation', initials: 'GS' },
  { name: 'Chennai Institute of Technology', role: 'Host institution', initials: 'CIT' },
  { name: 'Catapult at CIT', role: 'Student engagement', initials: 'CA' },
  { name: 'Tamil Nadu Volunteers', role: 'Community collaboration', initials: 'TNV' },
  { name: 'Kalpavriksha Seva Trust', role: 'Project collaboration', initials: 'KST' },
];
