export enum SubjectVersionValidity {
    Unspecified = 'Unspecified',
    Invalid = 'Invalid',
    ValidFrozen = 'ValidFrozen',
    ValidActive = 'ValidActive',
    Pending = 'Pending',
}

export interface SubjectVersionShortResource {
    subject_id: string;
    version: string;
    validity: SubjectVersionValidity;
}


export interface SubjectResource {
    id: string;
    type: string;
    title: string;
    versions: Array<SubjectVersionShortResource>;
    latest_version: string;
}

