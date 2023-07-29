export interface VMImageDependency{
    id: number;
    experimentName: string;
    vmimageName: string;
    vmimageUID: string;
    addedOn: Date;
}
export interface VPCDependency{
    id: number;
    experimentName: string;
    vpcID: string;
    CIDRBlock: string;
    SecurityGroup: string;
}