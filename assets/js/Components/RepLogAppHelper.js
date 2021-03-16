'use strict';

/**
 * A "private" object
 */
class Helper {
    constructor(repLogs){
        this.repLogs = repLogs;
    }

    calculateTotalWeight(){
        return Helper._calculateWieght(this.repLogs)
    }

    getTotalWeightString(maxWeight = 500){
        let wieght = this.calculateTotalWeight();

        if(wieght > maxWeight){
            wieght = maxWeight + '+';
        }

        return wieght + ' lbs';
    }

    static _calculateWieght(repLogs){
        let totalWeight = 0;
        for(let repLog of repLogs){
            totalWeight += repLog.totalWeightLifted;
        };

        return totalWeight;
    }
}

export default Helper;
