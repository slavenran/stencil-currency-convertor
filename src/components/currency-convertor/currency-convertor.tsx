import { h, Component, State, Watch } from "@stencil/core";
import { getExchangedValue } from "../../utils/apiCalls/apiCalls";
import { defaultCurrency } from "../../utils/utils";

type ExchangeObject = {
  fromCurrName: string,
  fromCurrCode: string,
  fromValue: number,
  toCurrName: string,
  toCurrCode: string,
  toValue: number,
  rate: number
};

@Component({
  tag: "currency-convertor",
  styleUrl: "currency-convertor.scss",
  scoped: true
})
export class CurrencyConvertor {

  @State() amount: number = 0;
  @State() from: string = defaultCurrency;
  @State() to: string = defaultCurrency;
  @State() exchangedValue: ExchangeObject;

  @Watch('amount')
  handleChange(currValue) {
    console.log(currValue);
  }

  private valueContainer = (currency, value, currCode) => <div>
    <div>{currency}</div>
    <div>
      {value}<span>{currCode}</span>
    </div>
  </div>;

  private handleChangeAmount = (e) => {
    this.amount = e.target.value;
  }

  private handleChangeCurrency = (currState: string, currency: string): void => {
    this[currState] = currency;
  }

  private handleSubmit = (e) => {
    e.preventDefault();
    getExchangedValue(this.from, this.to, this.amount)
    .then((result) => {
      this.exchangedValue = {
        fromCurrName: result.base_currency_name,
        fromCurrCode: result.base_currency_code,
        fromValue: result.amount,
        toCurrName: result.rates[this.to].currency_name,
        toCurrCode: this.to,
        toValue: result.rates[this.to].rate_for_amount,
        rate: result.rates[this.to].rate
      };
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div class="convertor-container">
        <form onSubmit={this.handleSubmit}>
          <div class="currency-inputs">
            <input class="currency-value" type="number" min={0} step={.01} onInput={this.handleChangeAmount}>{this.amount}</input>
            <div class="currency-code">
              <currencies-dropdown changeCurrency={(curr) => this.handleChangeCurrency('from', curr)}></currencies-dropdown>
              <currencies-dropdown changeCurrency={(curr) => this.handleChangeCurrency('to', curr)}></currencies-dropdown>
            </div>
          </div>
          <input class='submit-button' type="submit" value="SUBMIT" />
        </form>
        {this.exchangedValue &&
          <div>
            {this.valueContainer(this.exchangedValue?.fromCurrName, this.exchangedValue?.fromValue, this.exchangedValue?.fromCurrCode)}
            {this.valueContainer(this.exchangedValue?.toCurrName, this.exchangedValue?.toValue, this.exchangedValue?.toCurrCode)}
          </div>
        }
      </div>
    )
  }
}