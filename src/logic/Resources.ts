export enum DiffType {
    Added = 'Added',
    Removed = 'Removed',
    Changed = 'Changed',
}

export interface Diff {
    type: DiffType;
    changes: Map<string, string>;
}

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

export interface ReferenceShortResource {
    resource: Resource;
    version: string;
    url: string;
    requirements_count: number;
    diff?: Diff;
}

export enum SubjectType {
    Provider = 'Provider',
    Product = 'Product',
    ThirdParty = 'ThirdParty',
    Requirements = 'Requirements',
}

export interface SubjectShortResource {
    id: string;
    title: string;
    type: SubjectType;
}

export interface SubjectVersionResource {
    subject: SubjectShortResource;
    version: string;
    validity: SubjectVersionValidity;
    references: Array<ReferenceShortResource>;
    versions: Array<SubjectVersionShortResource>;
}


export interface SubjectResource {
    id: string;
    type: string;
    title: string;
    versions: Array<SubjectVersionShortResource>;
    latest_version: string;
}

export enum ResourceType {
    DescriptorDocument = 'DescriptorDocument',
    InternalDocument = 'InternalDocument',
    ExternalDocument = 'ExternalDocument',
    InternalAPI = 'InternalAPI',
    ExternalAPI = 'ExternalAPI',
}

export interface Resource {
    id: string;
    type: ResourceType;
    title: string;
}

export interface ResourceVersion {
    resource_id: string; 
    version: string;
    url?: string;
}

export interface SubjectReferenceResource {
    subject: SubjectShortResource;
    version: string;
}


export interface ResourceVersionResource {
    resource_id: string;
    version: string;
    resource: Resource;
    versions: Array<ResourceVersion>;
    referenced_by_subjects: Array<SubjectReferenceResource>;
}