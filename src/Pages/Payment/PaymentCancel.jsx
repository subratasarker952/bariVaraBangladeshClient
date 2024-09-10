import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div>
      <p>PaymentCancel</p>
      <Link className="btn" to={"/"}>
        Go to Home Page
      </Link>
    </div>
  );
};

export default PaymentCancel;
