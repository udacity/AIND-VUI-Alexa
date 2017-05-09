module.exports = {
    grepFourDigitNumber: function (myString) {
        if (/\d{4}/.test(myString)) {
            return myString.match(/\d{4}/)[0];
        }
        else {
            return null
        }
    },
    hasFourDigitNumber: function (myString) {
        return /\d{4}/.test(myString);
    },
    calcNumPhrasesIncluded: function (msgArr, phraseArr) {
        // counts the number of these phrases found in the messages
        // does not account for phrases within phrases
        var numUsed = 0;
        for (var i = 0; i < phraseArr.length; i++) {
            var inTheMsg = false;
            for (var j = 0; j < msgArr.length; j++) {
                if (msgArr[j].includes(phraseArr[i])) {
                    inTheMsg = true;
                }
            }
            if (inTheMsg) {
                numUsed++;
            }
        }
        return numUsed;
    }
};

