import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './layout/user/user.component';
import { HomeComponent } from './page/home/home.component';
import { ProductComponent } from './page/product/product.component';
import { CartComponent } from './page/cart/cart.component';
import { LoginComponent } from './page/login/login.component';
import { FooterComponent } from './footer/footer/footer.component';
import { ProductdetailComponent } from './page/productdetail/productdetail.component';
import { ProfileComponent } from './page/profile/profile.component';
import { RegisterComponent } from './page/register/register.component';
import { SubuserComponent } from './layout/subuser/subuser.component';
import { OrderComponent } from './page/order/order.component';
import { OrderdetailComponent } from './page/orderdetail/orderdetail.component';

const routes: Routes = [
  {
    path:'',
    component:UserComponent,
    children:[{
      path:'',
      component:HomeComponent
    }, 
    {
      path:'product',
      component:ProductComponent
    },
    {
      path:'cart',
      component:CartComponent
    },
    {
      path:'login',
      component:LoginComponent
    },
    {
      path:'products/:id',
      component:ProductdetailComponent
    },
    {
      path:'register',
      component:RegisterComponent
    },
    {
      path:'myuser',
      component:SubuserComponent,
      children:[{
        path:'',
        component:ProfileComponent
      },
      {
        path:'order',
        component:OrderComponent
      },
      {
        path:'orders/:id',
        component:OrderdetailComponent
      }]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
