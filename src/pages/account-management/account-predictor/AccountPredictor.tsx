/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountPredictorRewardsList } from "./account-predictor-rewards-list";
import "./AccountPredictor.scss";
interface AccountPredictorProps {
    data?: String;
}
const AccountPredictor = ({ data }: AccountPredictorProps) => {
    return (
        <div className="account-predictor">
            <div className="row  ">
                <div className="col-md-12 ">
                    <AccountPredictorRewardsList />
                </div>
            </div>
        </div>
    );
};

export default AccountPredictor;
