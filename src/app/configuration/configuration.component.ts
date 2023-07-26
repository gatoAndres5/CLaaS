import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiment } from '../experiment.model';
import { ExperimentService } from '../experiment.service';
import { VMImage } from '../vmimage.model';
import { VMImagesService } from '../vmimages.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  experiments: Experiment[] = [];
  VMImages: VMImage[] = [];
  experimentName: string = '';
  experimentDescription: string = '';
  VMImageName: string = '';
  VMImageUID: string = '';
  isSavingExperiment = false;
  isSavingVMImage = false;
  selectedExperimentId: number | undefined;
  login(){

  }
  setUsers(experimentId: number){
  
  }
  username: string = '';
  password: string = '';
  

  @ViewChild('experimentForm') experimentForm!: NgForm;
  @ViewChild('vmImageForm') vmImageForm!: NgForm;

  constructor(private experimentService: ExperimentService, private VMImagesService: VMImagesService) {}

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
      lastModified: new Date()
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
}




