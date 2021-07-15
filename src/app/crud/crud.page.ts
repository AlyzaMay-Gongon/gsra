import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

import { AccessProviders } from '../providers/access-providers'

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {
  id: number;
  CustomerName: string = "";
  CustomerAddress: string = "";
  dob: string = "";
  Age: string = "";
  Gender: string = "";
  ContactNo: string = "";
  Email_Address: string = "";
  Password: string = "";
  con_pass: string = "";

  disabledbutton;

  constructor(
    private router: Router,
    private toasctrl: ToastController,
    private alertctrl: AlertController,
    private loadingctrl: LoadingController,
    private accessproviders: AccessProviders,
    private actRouted: ActivatedRoute
  ) { }

  ngOnInit() {
    this.actRouted.params.subscribe((data:any)=>{
      console.log(data);
      this.id = data.id;

      if(this.id !=0){
        this.loadUser()
      }
    });
  }

  loadUser(){
    return new Promise(resolve =>{
      let body ={
        action: 'load_single_data',
        this: this.id,
      }
      this.accessproviders.postData(body,'api.php').subscribe((res:any)=>{
        this.CustomerName = res.result.CustomerName;
        this.CustomerAddress = res.result.CustomerAddress;
        this.Age = res.result.Age;
        this.Gender = res.result.Gender;
        this.ContactNo = res.result.ContactNo;
        this.Email_Address = res.result.Email_Address;
      });
    });
  }
  ionViewDidEnter(){
    this.disabledbutton = false;
  }
  async crudAction(a){
    if(this.CustomerName==""){
      this.presentToast('Enter Your Name');
    }else if(this.CustomerAddress==""){
      this.presentToast('Enter Your Address');
    }else if(this.dob==""){
      this.presentToast('Enter Your Date of Birth');
    }else if(this.Age==""){
      this.presentToast('Enter Your Age');
    }else if(this.Gender==""){
      this.presentToast('Enter Your Gender');
    }else if(this.ContactNo==""){
      this.presentToast('Enter Your Contact Number');
    }else if(this.Email_Address==""){
      this.presentToast('Enter Your Email Address');
    }else if(this.Password==""){
      this.presentToast('Enter Your Password');
    }else{
      this.disabledbutton = true;
      const loading = await this.loadingctrl.create({
        message: 'Registered Successfully',
      });
      await loading.present();

      return new Promise(resolve => {
        let body = {
          action: 'crud_progress',
          id: this.id,
          CustomerName: this.CustomerName,
          CustomerAddress: this.CustomerAddress,
          dob: this.dob,
          Age: this.Age,
          Gender: this.Gender,
          ContactNo: this.ContactNo,
          Email_Address: this.Email_Address,
          Password: this.Password,
          crudAction: a
        }
        this.accessproviders.postData(body, 'api.php').subscribe((res: any)=>{
          if(res.success==true){
            loading.dismiss();
            this.disabledbutton=false;
            this.presentToast(res.msg);
            this.router.navigate(['/home']);
          }else{
            loading.dismiss();
            this.disabledbutton=false;
            this.presentAlertConfirm(res.msg, a);
          }
        }, (err)=>{
          loading.dismiss();
          this.disabledbutton=false;
          this.presentAlertConfirm('Timeout', a);
        });
      });
    }
  }
  async presentToast(a){
    const toast = await this.toasctrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }
  async presentAlertConfirm(a,b){
    const alert = await  this.alertctrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          handler: (blah)=>{
            console.log('Confirm Cancel: blah');
          }
        }, {
          text:'Try Again',
          handler: ()=>{
            this.crudAction(b);
        }
      }
      ]
    });
    await alert.present();
  }
}

