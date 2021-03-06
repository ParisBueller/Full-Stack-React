import React, {Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        return (
            //required props on StripeCheckout: amount in cents,
            //token(callback function called after successful auth token received from stripe) in this case calling an action creator,
            //stripeKey(our publishable stripe key found in .env files)
            //optional props on StripeCheckout: name(displayed as header i.e who is charging you),
            //description(give the user some idea of what they are paying for)
            //can pass a child element to StripeCheckout component to change styling easily
            <StripeCheckout 
                name="Emaily"
                description="$5 for 5 email credits"
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
            <button className="btn">Add Credits</button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);


