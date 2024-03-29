import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiment } from '../experiment.model';
import { ExperimentService } from '../experiment.service';
import { VMImage } from '../vmimage.model';
import { VMImagesService } from '../vmimages.service';
import { Vpc } from '../vpc.model';
import { VpcService } from '../vpc.service';
import { DependencyService } from '../dependency.service'
import { VMImageDependency, VPCDependency } from '../dependency.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  experiments: Experiment[] = []; //holds experiments
  VMImages: VMImage[] = []; //holds VM image
  vpc: Vpc[] = []; //holds vpc
  VMImageDependency: VMImageDependency[] = []; //holds vm image dependency
  VPCDependency: VPCDependency[] = []; //holds vpc dependency
  //below are vars for input forms
  vpcID: string = '';
  CIDRBlock: string = '';
  SecurityGroup: string = '';
  experimentName: string = '';
  experimentDescription: string = '';
  VMImageName: string = '';
  VMImageUID: string = '';
  //below are conditions for saving
  isSavingExperiment = false;
  isSavingVMImage = false;
  isSavingVPC = false;
  //below are placements for selected items
  selectedExperiment: string = '';
  selectedVMImage: string = '';
  selectedVPC: string = '';
  selectedExperimentId: number | undefined = undefined;
  selectedVMImageId: number | undefined;
  selectedVpcId: number | undefined;

  setUsers(){
    this.router.navigate(['/viewExperimentUsers']);
  }
  //setup forms for inputting information
  @ViewChild('experimentForm') experimentForm!: NgForm;
  @ViewChild('vmImageForm') vmImageForm!: NgForm;
  @ViewChild('vpcForm') vpcForm!:NgForm;
  

  constructor(private experimentService: ExperimentService, private VMImagesService: VMImagesService,private VpcService: VpcService,private DependencyService: DependencyService,private router:Router) {}

  ngOnInit() {
    // Fetch the experiments only if the experiments array is empty
    console.log('Experiments array on ngOnInit:', this.experiments);
    console.log('Experiments array length on ngOnInit:', this.experiments.length);
    if (this.experiments.length === 0) {
      this.fetchExperiments();
    }
    if (this.VMImages.length === 0) {
      this.fetchVMImages();
    }
    if (this.vpc.length === 0) {
      this.fetchVPC();
    }
    if (this.VMImageDependency.length === 0){
      this.fetchVMImageDependencies();
    }
    if (this.VPCDependency.length === 0){
      this.fetchVPCDependencies();
    }
    this.selectedExperimentId = 0;
    this.selectedVMImageId = 0;
    this.experimentName = '';
  }
  // This method is called whenever the selectedExperimentId is changed in the dropdown
  onExperimentSelectChange(): void {
    if (!this.selectedExperiment) {
      console.log('No experiment selected.');
      return;
    }
  
  // Find the selected experiment from the experiments array by name
    const selectedExperiment = this.experiments.find(experiment => experiment.name === this.selectedExperiment);

  // Check if the selected experiment is valid and log its name
    if (selectedExperiment) {
    //console.log('Selected Experiment:', selectedExperiment.name);
    } else {
    //console.log('Invalid experiment or no experiment found.');
    }
  }
  fetchExperiments() {
    console.log('Arrived in fetchExperiments');
    this.experimentService.getExperiments().subscribe((experiments: Experiment[]) => {
      this.experiments = experiments;
      console.log('Experiments array after fetching:', this.experiments);
      console.log('Experiments array length after fetching:', this.experiments.length);
    });
  }
  fetchVMImages() {
    console.log('Arrived in fetchVMImages');
    this.VMImagesService.getVMImages().subscribe((VMImages: VMImage[]) => {
      this.VMImages = VMImages;
      console.log('VM Images array after fetching:', this.VMImages);
      console.log('VM Images array length after fetching:', this.VMImages.length);
    });
  }
  fetchVPC() {
    console.log('Arrived in fetchVPC');
    this.VpcService.getVPC().subscribe((Vpc: Vpc[]) => {
      this.vpc= Vpc;
      console.log('VPC array after fetching:', this.vpc);
      console.log('VPC array length after fetching:', this.vpc.length);
    });
  }
  fetchVMImageDependencies(){
    console.log('Arrived in fetchVMImageDependencies');
    this.DependencyService.getVMImageDependency().subscribe((Dependency: VMImageDependency[]) => {
      this.VMImageDependency= Dependency;
      console.log('VM Image Dependency array after fetching:', this.VMImageDependency);
      console.log('VM Image Dependency array length after fetching:', this.VMImageDependency.length);
    });
  }
  fetchVPCDependencies(){
    console.log('Arrived in fetchDependencies');
    this.DependencyService.getVPCDependency().subscribe((Dependency: VPCDependency[]) => {
      this.VPCDependency= Dependency;
      console.log('VPC Dependency array after fetching:', this.VPCDependency);
      console.log('VPC Dependency array length after fetching:', this.VPCDependency.length);
    });
  }
  deleteExperiment(experimentId: number) {
    this.experimentService.deleteExperiment(experimentId).subscribe(() => {
      this.experiments = this.experiments.filter(experiment => experiment.id !== experimentId);
    });
  }
  saveExperiment(): void {
    if (this.isSavingExperiment || !this.experimentForm.valid) {
      return;
    }

    const isDuplicate = this.experiments.some(experiment => experiment.name === this.experimentName);

    if (isDuplicate) {
      console.log('Experiment name already exists. Please choose a different name.');
      return;
    }

    this.isSavingExperiment = true;
    const newExperiment: Experiment = {
      id: 0,
      name: this.experimentName,
      description: this.experimentDescription,
      enabled: false,
      addedOn: new Date(),
      lastModified: new Date(),
      slides: null
    };

    this.experimentService.addExperiment(newExperiment).subscribe((addedExperiment: Experiment) => {
      this.experiments.push(addedExperiment);
      this.experimentName = '';
      this.experimentDescription = '';
      this.isSavingExperiment = false;
      console.log('Experiments array after adding:', this.experiments);
      console.log('Experiments array length after adding:', this.experiments.length);
    });
  }
  saveVMImage(): void {
    if (this.isSavingVMImage || !this.vmImageForm.valid) {
      return;
    }

    const isDuplicate = this.VMImages.some(VMImage => VMImage.name === this.VMImageName);

    if (isDuplicate) {
      //might need to change this to on screen message for user
      console.log('VM Image name already exists. Please choose a different name.');
      return;
    }

    this.isSavingVMImage = true;
    const newVMImage: VMImage = {
      id: 0,
      name: this.VMImageName,
      UID: this.VMImageUID,
      added: new Date(),
      lastModified: new Date()
    };

    this.VMImagesService.addVMImage(newVMImage).subscribe((addedVMImage: VMImage) => {
      this.VMImages.push(addedVMImage);
      this.VMImageName = '';
      this.VMImageUID = '';
      this.isSavingVMImage = false;
      console.log('VM Images array after adding:', this.VMImages);
      console.log('VM Images array length after adding:', this.VMImages.length);
    });
  }
  deleteVMImages(VMImageId: number) {
    this.VMImagesService.deleteVMImage(VMImageId).subscribe(() => {
      this.VMImages = this.VMImages.filter(VMImage => VMImage.id !== VMImageId);
    });
  }
  saveVPC(): void {
    if (this.isSavingVPC || !this.vpcForm.valid) {
      return;
    }

    const isDuplicate = this.vpc.some(vpc => vpc.vpcID === this.vpcID);

    if (isDuplicate) {
      //same thing here might want on screen message
      console.log('VPC Id already exists. Please choose a different Id.');
      return;
    }

    this.isSavingVPC = true;
    const newVPC: Vpc = {
      id: 0,
      vpcID: this.vpcID,
      CIDRBlock: this.CIDRBlock,
      CompleteCIDRBlock: this.CIDRBlock + 2,
      SecurityGroup: this.SecurityGroup
    };

    this.VpcService.addVPC(newVPC).subscribe((addedVpc: Vpc) => {
      this.vpc.push(addedVpc);
      this.vpcID = '';
      this.CIDRBlock = '';
      this.SecurityGroup = '';
      this.isSavingVPC = false;
      console.log('VPC array after adding:', this.vpc);
    console.log('VPC array length after adding:', this.vpc.length);
    });
  }
  deleteVPC(vpcID: number) {
    this.VpcService.deleteVPC(vpcID).subscribe(() => {
      this.vpc = this.vpc.filter(Vpc => Vpc.id !== vpcID);
    });
  }
  saveVPCDependency(): void {
    if (!this.selectedExperiment || !this.selectedVPC) {
      console.log('Please select an experiment and a VPC.');
      return;
    }
    
    // Find the selected experiment from the experiments array
    const selectedExperiment = this.experiments.find(experiment => experiment.name === this.selectedExperiment);
    console.log('Selected Experiment:', selectedExperiment);
  
    // Find the selected VM image from the VMImages array
    const selectedVPC = this.vpc.find(Vpc => Vpc.vpcID === this.selectedVPC);
    console.log('Selected VPC:', selectedVPC);
  
    // Check if the selected experiment and VM image are valid
    if (!selectedExperiment || !selectedVPC) {
      console.log('Invalid experiment or VPC');
      return;
    }
  
    // Create a new dependency object
    const newDependency = {
      id: 0,
      experimentName: selectedExperiment.name,
      vpcID: selectedVPC.vpcID,
      CIDRBlock: selectedVPC.CIDRBlock,
      SecurityGroup: selectedVPC.SecurityGroup
      // Add any other properties you want for the dependency
    };
  
    // Log the new dependency object
    console.log('New Dependency:', newDependency);
  
    // Save the new dependency using the dependency service
    //this.dependencyService.saveDependency(newDependency);
  
    // Clear the selected values after saving
    this.selectedExperiment = "";
    this.selectedVPC = "";
    this.DependencyService.addVPCDependency(newDependency).subscribe((addedDependency: VPCDependency) => {
      this.VPCDependency.push(addedDependency);
      
      console.log('Vpc Dependency array after adding:', this.VPCDependency);
      console.log('Vpc Dependency array length after adding:', this.VPCDependency.length);
    });
  }
  saveVMImageDependency(): void {
    if (!this.selectedExperiment || !this.selectedVMImage) {
      console.log('Please select an experiment and a VM image.');
      return;
    }
    
    // Find the selected experiment from the experiments array
    const selectedExperiment = this.experiments.find(experiment => experiment.name === this.selectedExperiment);
    console.log('Selected Experiment:', selectedExperiment);
  
    // Find the selected VM image from the VMImages array
    const selectedVMImage = this.VMImages.find(vmImage => vmImage.name === this.selectedVMImage);
    console.log('Selected VM Image:', selectedVMImage);
  
    // Check if the selected experiment and VM image are valid
    if (!selectedExperiment || !selectedVMImage) {
      console.log('Invalid experiment or VM image');
      return;
    }
  
    // Create a new dependency object
    const newDependency = {
      id: 0,
      experimentName: selectedExperiment.name,
      vmimageName: selectedVMImage.name,
      vmimageUID: selectedVMImage.UID,
      addedOn: new Date()
      // Add any other properties you want for the dependency
    };
  
    // Log the new dependency object
    console.log('New Dependency:', newDependency);
  
    // Save the new dependency using the dependency service
    //this.dependencyService.saveDependency(newDependency);
  
    // Clear the selected values after saving
    this.selectedExperiment = "";
    this.selectedVMImage = "";
    this.DependencyService.addVMImageDependency(newDependency).subscribe((addedDependency: VMImageDependency) => {
      this.VMImageDependency.push(addedDependency);
      
      console.log('VM Image Dependency array after adding:', this.VMImageDependency);
      console.log('VM Image Dependency array length after adding:', this.VMImageDependency.length);
    });
  }
  
  deleteVMImageDependency(dependencyId: number) {
    this.DependencyService.deleteVMImageDependency(dependencyId).subscribe(() => {
      this.VMImageDependency = this.VMImageDependency.filter(Dependency => Dependency.id !== dependencyId);
    });
  }
  deleteVPCDependency(dependencyId: number) {
    this.DependencyService.deleteVPCDependency(dependencyId).subscribe(() => {
      this.VPCDependency = this.VPCDependency.filter(Dependency => Dependency.id !== dependencyId);
    });
  }
}




