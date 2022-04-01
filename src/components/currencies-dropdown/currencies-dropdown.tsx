import { h, Component, State, Watch, Prop } from "@stencil/core";
import { getCurrencies } from "../../utils/apiCalls/apiCalls";
import { defaultCurrency } from "../../utils/utils";

export interface Currency {
  currency: string;
}

@Component({
  tag: "currencies-dropdown",
  styleUrl: "currencies-dropdown.scss",
  scoped: true
})
export class CurrenciesDropdown {

  @Prop() changeCurrency: Function;

  @State() currencies: Array<string> = [];
  @State() pickedCurrency: string = '';

  @Watch('pickedCurrency')
  handleChange(currValue: string) {
    this.changeCurrency(currValue);
  }

  private selectOnChange = (e: Event) => {
    this.pickedCurrency = (e.target as HTMLSelectElement).value;
  }

  componentDidLoad() {
    getCurrencies()
      .then((response) => {
        this.currencies = [...this.currencies, ...Object.keys(response.currencies)];
      })
      .catch(() => {
        console.log("Request failed!");
      });
  }

  render() {
    return (
      <select class={this.pickedCurrency !== '' ? '' : 'placeholder'} name="currencies" onChange={this.selectOnChange}>
        <option value="" selected disabled hidden>{defaultCurrency}</option>
        {
          this.currencies.map((currency) => <option key={currency} value={currency}>{currency}</option>)
        }
      </select>
    )
  }
}