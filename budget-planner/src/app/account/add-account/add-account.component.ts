import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Account, CardType } from '../../models/account.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.scss'
})
export class AddAccountComponent {

  accountForm: FormGroup;
  cardTypes = Object.values(CardType); 

  constructor(
    private router: Router,
    private account: AccountService
  ) {
    this.accountForm = new FormGroup({
      logo: new FormControl('',),
      bank: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cardType: new FormControl('', [Validators.required]),
      limit: new FormControl('', [Validators.min(0)]),
      balance: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  cancel() {
    this.router.navigate(['/accounts']);
  }

  setLogoPath(cardType: CardType): string {
    let logoPath = '';
    switch (cardType) {
      case CardType.VISA:
        logoPath = 'assets/images/visa-logo.png';
        break;
      case CardType.MASTERCARD:
        logoPath = 'assets/images/mastercard-logo-2.png';
        break;
      case CardType.AMEX:
        logoPath = 'assets/images/amex-logo.png';
        break;
      case CardType.CHEQUING:
        logoPath = 'assets/images/debit-logo.png';
        break;
      case CardType.SAVINGS:
        logoPath = 'assets/images/debit-logo.png';
        break;
      default:
        logoPath = '';
    }
    return logoPath;
  }

  submitForm() {
    if (this.accountForm.valid) {
      const selectedCardType = this.accountForm.get('cardType')?.value;
  
      let logoPath = this.setLogoPath(selectedCardType);
  
      const newAccount: Account = {
        logo: logoPath,
        cardType: selectedCardType,
        bankName: this.accountForm.get('bank')?.value,
        limit: this.accountForm.get('limit')?.value || 0,
        balance: this.accountForm.get('balance')?.value || 0,
        name: this.accountForm.get('bank')?.value + ' - ' + selectedCardType
      };
  
      this.account.addAccount(newAccount).subscribe(
        response => {
          console.log('Account created successfully:', response);
          this.router.navigate(['/accounts']);
        },
        error => {
          console.error('Error creating account:', error);
        }
      );
    }
  }
}
