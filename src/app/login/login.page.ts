import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AccessProviders } from '../providers/access-providers';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  Email_Address: string="";
  Password: string= "";

  disabledbutton;

  constructor(
    private router: Router,
    private toasctrl: ToastController,
    private alertctrl: AlertController,
    private loadingctrl: LoadingController,
    private accessproviders: AccessProviders,
    private navctrl: NavController,
    private storage: Storage
  ) { }
  
  ngOnInit() {
  }
  ionViewDidEnter(){
    this.disabledbutton=false;
  }
  openRegistration(){
    this.router.navigate(['/registration']);
  }

    async tryLogin(){
      if(this.Email_Address==''){
        this.presentToast('Email must be filled');
      }else if(this.Password==''){
        this.presentToast('Password is required');
      }else{
        this.disabledbutton=true;
        const loading =await this.loadingctrl.create({
          message: 'Wait a minute.....'
        });
        await loading.present();

        return new Promise(resolve=>{
          let body = {
            action: 'login_progress',
            email: this.Email_Address,
            password: this.Password
          }
          this.accessproviders.postData(body, 'api.php').subscribe((res:any)=>{
            if(res.success==true){
              loading.dismiss();
              this.disabledbutton=false;
              this.presentToast('Loading Successful');
              this.storage.set('strorage_session', res.result);
              this.navctrl.navigateRoot(['/home'])
            }else{
              loading.dismiss();
              this.disabledbutton=false;
              this.presentToast('Wrong email or Password');
            }
          },(error)=>{
            loading.dismiss();
            this.disabledbutton=true;
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
            this.tryLogin();
        }
      }
      ]
    });
    await alert.present()
  }
}
