import clsx from "clsx";

const Price = ({
  amount,
  className,
  currencyCode = "USD",
}: {
  amount: string;
  className?: string;
  currencyCode: string;
} & React.ComponentProps<"p">) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
    }).format(parseFloat(amount))}`}
    <span className="ml-1 inline">{`${currencyCode}`}</span>
  </p>
);

export default Price;
