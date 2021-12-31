import { AccountPredictorRewardsList } from "./account-predictor-rewards-list";
import "./AccountPredictor.scss";

const AccountPredictor = () => {
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
