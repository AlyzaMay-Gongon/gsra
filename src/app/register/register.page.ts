import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';


import { AccessProviders } from '../providers/access-providers'
import { promise } from 'protractor';
import { resolve } from 'dns';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
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
    private accessproviders: AccessProviders
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.disabledbutton = false;
  }

  async tryRegistration(){
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
    }else if(this.con_pass==""){
      this.presentToast('Enter Your Password to confirm');
    }else{
      this.disabledbutton = true;
      const loading = await this.loadingctrl.create({
        message: 'Registered Successfully',
      });
      await loading.present();

      return new Promise(resolve => {
        let body = {
          action: 'registration_progress',
          CustomerName: this.CustomerName,
          CustomerAddress: this.CustomerAddress,
          dob: this.dob,
          Age: this.Age,
          Gender: this.Gender,
          ContactNo: this.ContactNo,
          Email_Address: this.Email_Address,
          Password: this.Password,
          con_pass: this.con_pass,
        }
        this.accessproviders.postData(body, 'api.php').subscribe((res: any)=>{
          if(res.success==true){
            loading.dismiss();
            this.disabledbutton=false;
            this.presentToast(res.msg);
            this.router.navigate(['/login']);
          }else{
            loading.dismiss();
            this.disabledbutton=false;
            this.presentToast(res.msg);
          }
        }, (err)=>{
          loading.dismiss();
          this.disabledbutton=false;
          this.presentAlertConfirm('Timeout');
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
  async presentAlertConfirm(a){
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
            this.tryRegistration();
        }
      }
      ]
    });
    await alert.present();
  }
}
