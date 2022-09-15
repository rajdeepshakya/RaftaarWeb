import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import { faSquareTwitter } from '@fortawesome/free-brands-svg-icons'; 
import { faSquareWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { ShareService } from 'ngx-sharebuttons';
import { ShareButton } from 'ngx-sharebuttons/button';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShareComponent implements OnInit {
  fbBtn = faSquareFacebook;
  wappBtn = faSquareWhatsapp;
  twtBtn= faSquareTwitter;
  linkedbtn = faLinkedinIn;
  fbmessangerbtn = faFacebookMessenger;
  copybtn = faCopy;

  constructor(private share: ShareService) {
  }

  ngOnInit(): void {
  //   this.share.addButton('customButton', {
  //     type: 'customButton',
  //     text: 'My Custom Button',
  //     icon: ['fas', 'fas-comments-dollar'],
  //     params: {
  //       // define the needed parameters here
  //     },
  //     // If the button uses a custom function, then set your custom function
  //     func: () => {console.log('abcd');
  //     }
  //   });
  //   this.shareButtons.addButton('sms', {
  //     type: 'sms',
  //     text: 'SMS',
  //     icon: 'fas fa-comment-alt',
  //     color: '#7F1E3B',
  //     share: {
  //       desktop: 'sharerLink',
  //       metaTags: {
  //         url: 'paramNameForURL'
  //       },
  //       operators: [
  //         urlInMessageOperator,
  //         metaTagsOperator
  //       ]
  //     }
  //   });
  // }
   }

}
