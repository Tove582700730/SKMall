/**
 * Created by  18-8-22.
 */
function update_fee(obj_tr, unit_price) {
    var fee_rate = parseFloat(obj_tr.data('fee-rate'));
    var fee_up = parseFloat(obj_tr.data('fee-up'));
    var fee_down = parseFloat(obj_tr.data('fee-down'));
    var fee_roll_cash = parseFloat(obj_tr.data('fee-roll-cash'));
    var fee_money = 0;
    if(fee_rate>0){
        if (fee_roll_cash <= unit_price) {
            fee_money = unit_price * fee_rate / 100;
        }
        else {
            fee_money = 0;
        }
        if (fee_money > 0) {
            if (fee_down > 0 && fee_money < fee_down) {
                fee_money = fee_down;
            }
            else if (fee_up > 0 && fee_money > fee_up) {
                fee_money = fee_up;
            }
        }
    }
    var temp = parseFloat(fee_money * 100);
    //console.log(temp);
    fee_money = Math.ceil(temp) / 100;
    return parseFloat(fee_money).toFixed(2);
}