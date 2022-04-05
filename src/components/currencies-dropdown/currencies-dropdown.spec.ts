import { newSpecPage } from "@stencil/core/testing"
import { CurrenciesDropdown } from "./currencies-dropdown"

describe('currencies-dropdown', () => {
  it('builds', () => {
    expect(new CurrenciesDropdown()).toBeTruthy();
  })

  it('checks default', async () => {
    const { root } = await newSpecPage({
      components: [CurrenciesDropdown],
      html: '<currencies-dropdown default-currency="USD"></currencies-dropdown>'
    });

    expect(root.defaultCurrency).toEqual("USD");
  })
})