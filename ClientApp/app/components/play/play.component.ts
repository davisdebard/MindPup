import { Component, Directive, OnInit } from '@angular/core';
import { NgIf } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Card } from './card';
import { CARDARRAY } from './cardarray';
import { CardPlay } from './cardplay';
import { CARD1, CARD2, CARD3 } from './mock-cards';
import { CardService } from './card.service';
import { HttpModule } from '@angular/http';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ]
})

@Component({
    selector: 'play',
    templateUrl: './play.component.html',
    styleUrls: ['play.component.css'],
    providers: [CardService]
})
export class PlayComponent implements OnInit {

    constructor(private cardService: CardService) { }

    /******************************
     * Variables
     ******************************/
    // Objects.
    cards = CARD1;                // Pre-load with first mock card.
    cardArray = CARDARRAY;        // 10set array of cards, with working fields.
    cardTypes: Array<Object> = [
        { id: 0, name: "" },
        { id: 1, name: "Multiple Choice" },
        { id: 2, name: "Fill In" },
        { id: 3, name: "Fill In Swappable" },
        { id: 4, name: "True False" },
    ];
    statuses: Array<Object> = [
        { id: 0, name: "" },
        { id: 1, name: "Not Started" },
        { id: 2, name: "Intro Statement" },
        { id: 3, name: "Play Question" },
        { id: 4, name: "Seen Correct" },
        { id: 5, name: "Seen Incorrect" },
        { id: 6, name: "Review Statement" },
        { id: 7, name: "Complete" },
    ];

    // Local copy of CardPlay.
    PlayTenSetId: number;
    PointId: number;
    IsCorrect: number;
    LevelAward: number;
    LevelAwardScore: number;
    LevelBoost: number;
    LevelBoostScore: number;
    LevelImage: number;
    LevelName: string;
    LevelNoWon: number;
    PlayId: number;
    PlayerName: string;
    PointName: string;
    Q1Ans1Act: string;
    Q1Ans2Alt: string;
    Q1Ans3Alt: string;
    Q1Ans4Alt: string;
    Q1Question: string;
    Q1TypeId: number;
    Q2Ans1Act: string;
    Q2Ans2Alt: string;
    Q2Ans3Alt: string;
    Q2Ans4Alt: string;
    Q2Question: string;
    Q2TypeId: number;
    Q3Ans1Act: string;
    Q3Ans2Alt: string;
    Q3Ans3Alt: string;
    Q3Ans4Alt: string;
    Q3Question: string;
    Q3TypeId: number;
    SectionId: number;
    S1Statement: string;
    S2Statement: string;
    ToVerify: number;

    /* Additional fields in CardArray that are temporary, used in calculations. */
    CountAsked: number;
    CountAskedVerify: number;
    CountRight: number;
    CountRightVerify: number;
    IsPassed: number;
    IsReview: number;
    IsVerified: number;
    Score: number;
    ScoreVerify: number;

    // Working fields used in playing a card.
    ans1Alt = "";
    ans2Alt = "";
    ans3Alt = "";
    answer = "";
    answerGiven = "";
    answerGivenLetter = "";
    answerLetter = "A";
    award = "";
    boost = "";
    cardStatus = "Not Started";
    cardType = "";
    cardTypeNo: number;
    hasQuestions: number;
    hasStatements: number;
    phase = "Play";         // Alternative is "Verify".
    pointNo = 0;            // The point number as it appears to the user.
    pointNoArray = 0;       // The point number in the array (one less).
    pointNoLastPassed = 0;  // The point number to return to after review.
    pointNoLastPlayed = 0;  // Don't review the point no last played unless there's nothing left.
    pointNoMax = 0;         // Maximum number of points (for this sample).
    pointNoArrayStartReview = 0; // Where we start looking for review points. Defaults to halfway of 10set.
    progressPct = 0;
    question = "";
    sectionImprovePct = 0;
    sectionName = "SAMPLE";
    sectionAsked = 0;
    sectionCorrect = 0;
    sectionPrevAsked = 0;
    sectionPrevCorrect = 0;
    sectionScore = 0;
    statementIntro = "";
    statementReview = "";
    tenSetAsked = 0;
    tenSetCorrect = 0;
    tenSetNo = 1;
    tenSetScore = 0;
    testInfo = "";          // Used throughout to test variables.
    title = 'MindPup Playful Learning';
    trailImage = "";

    /******************************
     * Methods
     *******************************/
    // Select which points in this 10set will need verification.
    assignVerifyPoints(): number {
        // < 80%: Points 2 and 7  In array:  1 and 6.
        // < 60%: Points 4 and 8  In array:  3 and 7.
        // < 40%: Points 1 and 9  In array:  0 and 8.

        // No need to verify.
        var pt = this.pointNoMax + 1;
        if (this.tenSetScore > 80) return pt;

        // To verify if < 80% (the first point to verify is #2):
        if (this.pointNoMax >= 2) this.cardArray[1].ToVerify = 1;
        if (this.pointNoMax >= 7) this.cardArray[6].ToVerify = 1;
        if (this.tenSetScore > 60) return 2;

        // To verify if < 60% (the first point to verify is still #2):
        if (this.pointNoMax >= 4) this.cardArray[3].ToVerify = 1;
        if (this.pointNoMax >= 8) this.cardArray[7].ToVerify = 1;
        if (this.tenSetScore > 40) return 2;

        // To verify if < 40% (now the first point to verify is #2):
        if (this.pointNoMax >= 1) this.cardArray[0].ToVerify = 1;
        if (this.pointNoMax >= 9) this.cardArray[8].ToVerify = 1;
        return 1;
    }
    // Calculate the next question to be asked.
    calcNextQuestion(isReview: number): number {
        // Expect the point to have been loaded.
        var nextQuestion = 0;
        // If there are no questions (possible), then return 0.
        if (this.Q1Question == "") {
            nextQuestion = 0;
        }
        // If there is only one question, return 1.
        else if (this.Q2Question == "") {
            nextQuestion = 1;
        }
        // Q1Question, if present, will always be presented first.
        else if (this.CountAsked == 0 && this.phase == 'Play') {
            nextQuestion = 1;
        }
        // If CountAsked > 0 or phase == 'Verify', then we're cycling through the questions.
        else {
            // At this point, there are at least two questions, since Q2Question has a value.
            var questionCnt = 2;
            if (this.Q3Question != "") {
                questionCnt = 3;
            }
            // Total number of questions asked on this point includes
            // original questions asked + review questions asked (asked - right)
            // plus the same thing for the verify phase.
            var askCnt = this.CountAsked
                + this.CountAskedVerify;
            // Example:  questionCnt = 3.
            // Ex. #1:  askCnt = 1.  Want Q2Question, since Q1Question has already been asked.
            // Ex. #2:  askCnt = 2.  Want Q3Question.      
            // Ex. #3:  askCnt = 3.  Want Q1Question.
            // Ex. #4:  askCnt = 4.  Want Q2Question.
            // askCnt % 3 = #1:  1 + 1 = 2
            // askCnt % 3 = #2:  2 + 1 = 3
            // askCnt % 3 = #3:  0 + 1 = 1
            // askCnt % 3 = #4:  1 + 1 = 2

            var nextQuestion = (askCnt % questionCnt) + 1;

            // If we're reviewing, exclude the most recent (CountAsked - CountRight)
            // because we haven't gotten there yet.
            // if (isReview == 1)
            // {
            //   nextQuestion--;
            // }
            if (nextQuestion > questionCnt) {
                nextQuestion = 1;
            }
        }

        // Load data pertinent to nextQuestion.
        switch (nextQuestion) {
            case 0:
                this.hasQuestions = 0;
                this.answer = "";
                this.ans1Alt = "";
                this.ans2Alt = "";
                this.ans3Alt = "";
                this.question = "";
                break;
            case 1:
                this.hasQuestions = 1;
                this.answer = this.Q1Ans1Act;
                this.ans1Alt = this.Q1Ans2Alt;
                this.ans2Alt = this.Q1Ans3Alt;
                this.ans3Alt = this.Q1Ans4Alt;
                this.question = this.Q1Question;
                break;
            case 2:
                this.hasQuestions = 1;
                this.answer = this.Q2Ans1Act;
                this.ans1Alt = this.Q2Ans2Alt;
                this.ans2Alt = this.Q2Ans3Alt;
                this.ans3Alt = this.Q2Ans4Alt;
                this.question = this.Q2Question;
                break;
            case 3:
                this.hasQuestions = 1;
                this.answer = this.Q3Ans1Act;
                this.ans1Alt = this.Q3Ans2Alt;
                this.ans2Alt = this.Q3Ans3Alt;
                this.ans3Alt = this.Q3Ans4Alt;
                this.question = this.Q3Question;
                break;
        }
        return nextQuestion;
    }
    // Calculate the next statement to be presented.
    calcNextStatement(isReview: number): number {
        var nextStatement = 0;

        // Expect the point to have been loaded.
        // If there are no statements, then return 0.
        if (this.S1Statement == "") {
            nextStatement = 0;
        }
        // If there is only one statement, return 1.
        else if (this.S2Statement == "") {
            nextStatement = 1;
        }
        // S1Statement, if present, will always be presented first.
        else {
            if (this.CountAsked == 0) {
                nextStatement = 1;
            }
            else {
                // If CountAsked > 0, then we're reviewing.
                // Otherwise, we wouldn't need a statement.
                // Ex. #1:  CountAsked = 1.  CountRight = 0.
                //          Want S2Statement, since S1Statement was the intro.
                // Ex. #2:  CountAsked = 2.  Want S1Statement, since S2Statement was the first review.      
                // Ex. #3:  CountAsked = 3.  Want S2Statement, etc.
                // CountAsked % 2 = #1:  1 + 1 = 2
                // CountAsked % 2 = #2:  0 + 1 = 1
                // CountAsked % 2 = #3:  1 + 1 = 2

                var askCnt = 1 + (this.CountAsked - this.CountRight)
                    + (this.CountAskedVerify - this.CountRightVerify);

                // Exclude the difference between asked and right if we're still in review,
                // because we're trying to get the next statement we should show in review,
                // so the (CountAsked - CountRight) should exclude the current instance.
                if (isReview == 1) {
                    askCnt--;
                }

                // Get the next statement ( + 1).
                nextStatement = (askCnt % 2) + 1;

                // We are toggling between 1 and 2.
                if (nextStatement > 2) {
                    nextStatement = 1;
                }
            }
        }

        // Load fields pertinent to next statement.
        switch (nextStatement) {
            case 0:
                this.hasStatements = 0;
                this.statementIntro = "";
                this.statementReview = "";
                break;
            case 1:
                this.hasStatements = 1;
                this.statementIntro = this.S1Statement;
                this.statementReview = this.S1Statement;
                break;
            case 2:
                this.hasStatements = 1;
                this.statementIntro = this.S1Statement;
                this.statementReview = this.S2Statement;
                break;
        }
        return nextStatement;
    }
    // Calculate % complete based on a system of half points.
    calcPctComplete(): number {
        // Calculate the percentage complete after finishing each point.

        // Strategy:
        // ========
        // Using point stages to determine percent complete.
        // Stage 1: Passed.   0.5% of 10set complete.
        // Stage 2: Verified. 1.0% of 10set complete.
        // When a 10set score exceeds these percents,
        // > 80%: Points 2 and 7  In array:  1 and 6.
        // > 60%: Points 4 and 8  In array:  3 and 7.
        // > 40%: Points 1 and 9  In array:  0 and 8.

        // Mark points as verified.
        var pctComplete = 0;
        var scoreToHere = 0;
        var totalCorrect = 0;
        var totalPlayed = 0;

        for (let card of this.cards) {
            totalPlayed++;
            if (card.IsCorrect == 1) {
                totalCorrect++;
            }
        }

        // Calculate score to this point.
        if (totalPlayed > 0) {
            scoreToHere = (100 * totalCorrect) / totalPlayed;
        }

        // Mark isVerified true when we're sure we won't need to
        // verify further.
        if (scoreToHere >= 40) {
            if (this.pointNoMax >= 1) this.cardArray[0].IsVerified = 1;
            if (this.pointNoMax >= 9) this.cardArray[8].IsVerified = 1;
        }
        if (scoreToHere >= 60) {
            if (this.pointNoMax >= 4) this.cardArray[3].IsVerified = 1;
            if (this.pointNoMax >= 8) this.cardArray[7].IsVerified = 1;
        }
        if (scoreToHere >= 80) {
            if (this.pointNoMax >= 2) this.cardArray[1].IsVerified = 1;
            if (this.pointNoMax >= 7) this.cardArray[6].IsVerified = 1;
        }

        // Calculate percent complete.
        var halfPoints = 0;
        for (let card of this.cardArray) {
            // A half "completion point" is earned every time a point is passed.
            if (card.IsPassed == 1) {
                halfPoints++;
            }
            // A half "completion point" is earned every time a point is verifed.
            if (card.IsVerified == 1) {
                halfPoints++;
            }
        }

        // Calculate percentage complete for the progress bar.
        if (this.pointNoMax > 0) {
            pctComplete = +((100 * (halfPoints / (2 * this.pointNoMax))).toFixed(0));
        }
        return pctComplete;
    }
    // Clears the 10set card array.
    clearCardArray(): void {

        for (let card of this.cardArray) {
            /* Don't touch PointNo.  This stays 1 through 10. */
            card.CountAsked = 0;
            card.CountAskedVerify = 0;
            card.CountRight = 0;
            card.CountRightVerify = 0;
            card.IsPassed = 0;
            card.IsReview = 0;
            card.IsVerified = 0;
            card.Score = 0;
            card.ScoreVerify = 0;

            /* Part #2 */
            card.PlayTenSetId = 0;
            card.PointId = 0;
            card.IsCorrect = 0;
            card.LevelAward = 0;
            card.LevelAwardScore = 0;
            card.LevelBoost = 0;
            card.LevelBoostScore = 0;
            card.LevelImage = 0;
            card.LevelName = "";
            card.LevelNoWon = 0;
            card.PlayId = 0;
            card.PlayerName = "";
            card.PointName = "";
            card.Q1Ans1Act = "";
            card.Q1Ans2Alt = "";
            card.Q1Ans3Alt = "";
            card.Q1Ans4Alt = "";
            card.Q1Question = "";
            card.Q1TypeId = 0;
            card.Q2Ans1Act = "";
            card.Q2Ans2Alt = "";
            card.Q2Ans3Alt = "";
            card.Q2Ans4Alt = "";
            card.Q2Question = "";
            card.Q2TypeId = 0;
            card.Q3Ans1Act = "";
            card.Q3Ans2Alt = "";
            card.Q3Ans3Alt = "";
            card.Q3Ans4Alt = "";
            card.Q3Question = "";
            card.Q3TypeId = 0;
            card.SectionId = 0;
            card.S1Statement = "";
            card.S2Statement = "";
            card.ToVerify = 0;
        }
    }
    // Resets all local variables, when restarting.
    clearLocalVariables(): void {

        // IMPORTANT: If more local variables added, include them here!
        // =========
        this.PlayTenSetId = 0;
        this.PointId = 0;
        this.IsCorrect = 0;
        this.LevelAward = 0;
        this.LevelAwardScore = 0;
        this.LevelBoost = 0;
        this.LevelBoostScore = 0;
        this.LevelImage = 0;
        this.LevelName = "";
        this.LevelNoWon = 0;
        this.PlayId = 0;
        this.PlayerName = "";
        this.PointName = "";
        this.Q1Ans1Act = "";
        this.Q1Ans2Alt = "";
        this.Q1Ans3Alt = "";
        this.Q1Ans4Alt = "";
        this.Q1Question = "";
        this.Q1TypeId = 0;
        this.Q2Ans1Act = "";
        this.Q2Ans2Alt = "";
        this.Q2Ans3Alt = "";
        this.Q2Ans4Alt = "";
        this.Q2Question = "";
        this.Q2TypeId = 0;
        this.Q3Ans1Act = "";
        this.Q3Ans2Alt = "";
        this.Q3Ans3Alt = "";
        this.Q3Ans4Alt = "";
        this.Q3Question = "";
        this.Q3TypeId = 0;
        this.SectionId = 0;
        this.S1Statement = "";
        this.S2Statement = "";
        this.ToVerify = 0;

        /* These fields are temporary, used in calculations. */
        //this.CountAsked = 0;
        this.CountAskedVerify = 0;
        this.CountRight = 0;
        this.CountRightVerify = 0;
        this.IsPassed = 0;
        this.IsReview = 0;
        this.IsVerified = 0;
        this.Score = 0;
        this.ScoreVerify = 0;

        // Used in playing a card.
        this.ans1Alt = "";
        this.ans2Alt = "";
        this.ans3Alt = "";
        this.answer = "";
        this.answerGiven = "";
        this.answerGivenLetter = "";
        this.answerLetter = "A";
        this.award = "";
        this.cardStatus = "Not Started";
        this.cardType = "";
        this.cardTypeNo = 0;
        this.phase = "Play";
        this.pointNo = 0;
        this.pointNoArray = 0;
        this.pointNoLastPassed = 0;
        this.pointNoLastPlayed = 0;
        this.pointNoMax = 0;
        this.pointNoArrayStartReview = 0;
        this.progressPct = 0;
        this.question = "";
        this.sectionImprovePct = 0;
        this.sectionName = "SAMPLE";
        this.sectionAsked = 0;
        this.sectionCorrect = 0;
        this.sectionPrevAsked = 0;
        this.sectionPrevCorrect = 0;
        this.sectionScore = 0;
        this.statementIntro = "";
        this.statementReview = "";
        this.tenSetAsked = 0;
        this.tenSetCorrect = 0;
        this.tenSetNo = 1;
        this.tenSetScore = 0;
        this.title = 'MindPup Playful Learning';
        this.trailImage = "";
    }
    // Returns the first unpassed point in either Play or Verify phases.
    firstUnpassedPoint(): number {
        // Returns the first unpassed point.
        // Exception #1: Skips if it was the point just played, and there are more unpassed points to play.
        // Exception #2: Skips if it was the point before that, and there are more unpassed points to play.
        // Returns pointNoMax if no unpassed points found.    
        var i = 0;
        var pt = 0;
        var ptCur = this.pointNoLastPlayed;
        var ptFirst = 0;
        var ptPrev = ptCur - 1;

        if (this.phase == "Play") {
            i = 0;
            for (let card of this.cardArray) {
                i++;
                if (card.IsPassed == 0) {
                    // Remember the first unpassed point, in case
                    // we get to the end, then go back (which could happen
                    // if the first unpassed point is either the previous
                    // or the current point, and we're at the end of the 10set.
                    if (pt == 0) {
                        ptFirst = i;
                    }
                    pt = i;
                    if (pt != ptCur && pt != ptPrev) {
                        // Don't return the "first", because we have a point
                        // that was neither the current or previous point
                        // and is not the last point in the 10set.
                        return pt;
                    }
                }
            }
        }

        if (this.phase == "Verify") {
            i = 0;
            for (let card of this.cardArray) {
                i++;
                if (card.ToVerify == 1 &&
                    card.IsVerified == 0) {
                    return i;
                }
            }
        }

        // If there was an unpassed point, but it was excepted from the above,
        // remove the exceptions now, because we're near the end, so need to review it.
        if (ptFirst > 0) {
            return ptFirst;
        }

        // Move to the Verify phase.
        if (this.pointNo >= this.pointNoMax && this.phase == "Play") {
            this.phase = "Verify";

            this.tenSetScore = this.score10Set();
            // Make verify point assignments based on the 10set score, 
            // and return the first point number we need to verify.
            pt = this.assignVerifyPoints();
            return pt;
        }
        // There are no unpassed points.
        return this.pointNoMax + 1;
    }
    // Increment both the Point number and the array point numbe.
    incrementPointNo(): void {
        // to the next item to revew passed the last passed point.
        if (this.pointNo < this.pointNoLastPassed) {
            this.pointNo = this.pointNoLastPassed;
        }
        this.pointNo++;
        this.pointNoArray = this.pointNo - 1; // zero based array.
    }
    // Clears and loads the static 10set card array.
    loadCardArray(): void {

        // Start by clearing the previous CardArray.
        this.clearCardArray();

        // Expect cards to be freshly loaded with new 10set here.
        var i: number;
        var len: number;

        i = 0;
        len = this.cards.length;    // Number of cards in this 10set.  Can be 1 to 10.

        for (let card of this.cardArray) {
            if (i < len) {
                /* Part #2 only. */
                card.PlayTenSetId = this.cards[i].PlayTenSetId;
                card.PointId = this.cards[i].PointId;
                card.IsCorrect = this.cards[i].IsCorrect;
                card.LevelAward = this.cards[i].LevelAward;
                card.LevelAwardScore = this.cards[i].LevelAwardScore;
                card.LevelBoost = this.cards[i].LevelBoost;
                card.LevelBoostScore = this.cards[i].LevelBoostScore;
                card.LevelImage = this.cards[i].LevelImage;
                card.LevelName = this.cards[i].LevelName;
                card.LevelNoWon = this.cards[i].LevelNoWon;
                card.PlayId = this.cards[i].PlayId;
                card.PlayerName = this.cards[i].PlayerName;
                card.PointName = this.cards[i].PointName;
                card.Q1Ans1Act = this.cards[i].Q1Ans1Act;
                card.Q1Ans2Alt = this.cards[i].Q1Ans2Alt;
                card.Q1Ans3Alt = this.cards[i].Q1Ans3Alt;
                card.Q1Ans4Alt = this.cards[i].Q1Ans4Alt;
                card.Q1Question = this.cards[i].Q1Question;
                card.Q1TypeId = this.cards[i].Q1TypeId;
                card.Q2Ans1Act = this.cards[i].Q2Ans1Act;
                card.Q2Ans2Alt = this.cards[i].Q2Ans2Alt;
                card.Q2Ans3Alt = this.cards[i].Q2Ans3Alt;
                card.Q2Ans4Alt = this.cards[i].Q2Ans4Alt;
                card.Q2Question = this.cards[i].Q2Question;
                card.Q2TypeId = this.cards[i].Q2TypeId;
                card.Q3Ans1Act = this.cards[i].Q3Ans1Act;
                card.Q3Ans2Alt = this.cards[i].Q3Ans2Alt;
                card.Q3Ans3Alt = this.cards[i].Q3Ans3Alt;
                card.Q3Ans4Alt = this.cards[i].Q3Ans4Alt;
                card.Q3Question = this.cards[i].Q3Question;
                card.Q3TypeId = this.cards[i].Q3TypeId;
                card.SectionId = this.cards[i].SectionId;
                card.S1Statement = this.cards[i].S1Statement;
                card.S2Statement = this.cards[i].S2Statement;
                card.ToVerify = this.cards[i].ToVerify;
            }
            i++;
        }
    }
    // Read in a tenset.  May end or begin a section. Loads card array.
    loadCards(tenset): void {
        // Pull data.
        // Remember the previous 10set info for a proper section score.
        if (tenset > 1) {
            // Temporary...
            this.cardStatus = "Complete";
            return;

            // this.sectionAsked += this.tenSetAsked;
            // this.sectionCorrect += this.tenSetCorrect;

            // // Reset for the next tenSet.
            // this.tenSetAsked = 0;
            // this.tenSetCorrect = 0;
            // this.tenSetScore = 0;

            // this.cards.length = 0;  // Remove previous array.
            // Start points and pointNoMax over with this 10set.
            // this.pointNoMax = this.pointNoMax + this.cards.length;
            // this.pointNo++;
            // this.phase = "Play";
        }

        // Remove previous cards, if any.
        // this.cards.length = 0;

        // Load new 10set into cards structure.

        // IMPORTANT: THIS DOES NOT APPEAR TO WORK!!!
        // =========
        //this.cardService.getCards(tenset).then(cards => this.cards = cards);

        /* Clear and reload the card array structure.
           The difference between the cards and card array structures
           is the addition of a few more temporary work fields,
           not needed to be stored and retrieved from the database. */

        this.loadCardArray();

        /* Note: The maximum point is not the length of the cardArray, which is 
           ----  aways 10, but the card structure, whose length varies */
        this.pointNoMax = this.cards.length;
        this.pointNo = 0;
        this.pointNoArray = 0;

        // Start review at around the halfway point of this 10set.
        this.pointNoArrayStartReview = +((this.pointNoMax / 2).toFixed(0));
    }
    // Chooses the next point to play, review or verify.
    loadNextPoint(): void {
        // Getting the next point.

        // Strategy
        // ========   
        // Get Next Point: For the first 2/3rd of the points in a 10set,
        // --------------  or a section, whichever is less, get the next point.
        //                 The 2/3 point is called pointNoArrayStartReview.
        //
        // First Unpassed: From pointNoArrayStartReview on to the end of the 10set, 
        // --------------  get the first unpassed point in the 10set, provided it
        //                 is NOT the CURRENT or PREVIOUS point played.  
        //                 Example: 6 points max.
        //                 The 2/3rd point is array value 3 (0, 1, 2, 3 are pts 1 through 4).
        //                 If array 0 or 1 is unpassed, play the first of these.
        // No Unpassed:    If there are no unpassed points prior to this that are 
        // ------------    NOT the CURRENT or PREVIOUS point played, get the next point.
        // No More Points: If there are no new points to play, keep playing the points
        // --------------  until they are all passed.
        // End of 10set:   When you reach the end of a 10set, evaluate the score,
        // ------------    and verify.  < 80%: Points 2 and 7
        //                              < 60%: Points 4 and 8
        //                              < 40%: Points 1 and 9
        // End of Section: Show completion.   
        var atEnd = 0;
        // In the Verify phase, just get points needing verification.
        // If none are left, we should be at the end.
        if (this.phase == "Verify") {
            this.pointNo = this.firstUnpassedPoint();
            this.pointNoArray = this.pointNo - 1;

            if (this.pointNo > this.pointNoMax) {
                this.on10setComplete();
            }
            else {
                this.loadPoint(this.pointNoArray);
            }
            return;
        }

        // Moves to the next point, even if that moves past the end.
        // Moves pointNoArray as well.
        // Returns to the last passed point.
        this.incrementPointNo();

        if (this.pointNo > this.pointNoMax) {
            atEnd = 1;
        }

        if (this.pointNoArray > this.pointNoArrayStartReview) {
            // Returns pointNoMax + 1 if there are no unpassed points.
            // Skips point if it is the last point played, or the previous point played,
            // unless there are no more points to play.
            this.pointNo = this.firstUnpassedPoint();

            // Not reviewing if we're moving forward.
            if (this.pointNo >= this.pointNoLastPassed) {
                this.IsReview = 0;
            } else {
                this.IsReview = 1;
            }
        }
        else {
            // We're moving forward anyway.
            this.IsReview = 0;
        }

        // If we're going to a review point, do it here.
        if (this.pointNo <= this.pointNoMax) {
            atEnd = 0;
            this.pointNoArray = this.pointNo - 1;
        }

        if (atEnd == 0) {
            this.loadPoint(this.pointNoArray);
        }
        else {
            this.cardStatus = "Complete";
            this.onSectionComplete();
        }
    }
    // When a question is answered incorrectly, this loads the review question,
    loadReviewQuestion(): void {
        var nextQuestion = this.calcNextQuestion(1);
    }
    // When a question is answered incorrectly, this loads the review statement.
    loadReviewStatement(): void {
        var nextStatement = this.calcNextStatement(1);
    }
    // Loads point from array into local point variables. 
    loadPoint(arrayPoint): void {
        // This is the card we're playing.
        this.pointNoLastPlayed = arrayPoint + 1;

        // Load a complete point into fields.
        this.PlayId = this.cardArray[arrayPoint].PlayId;
        this.PointId = this.cardArray[arrayPoint].PointId;
        this.PlayTenSetId = this.cardArray[arrayPoint].PlayTenSetId;
        this.CountAsked = this.cardArray[arrayPoint].CountAsked;
        this.CountAskedVerify = this.cardArray[arrayPoint].CountAskedVerify;
        this.CountRight = this.cardArray[arrayPoint].CountRight;
        this.CountRightVerify = this.cardArray[arrayPoint].CountRightVerify;
        this.IsCorrect = this.cardArray[arrayPoint].IsCorrect;
        this.IsPassed = this.cardArray[arrayPoint].IsPassed;
        this.IsVerified = this.cardArray[arrayPoint].IsVerified;
        this.LevelAward = this.cardArray[arrayPoint].LevelAward;
        this.LevelAwardScore = this.cardArray[arrayPoint].LevelAwardScore;
        this.LevelBoost = this.cardArray[arrayPoint].LevelBoost;
        this.LevelBoostScore = this.cardArray[arrayPoint].LevelBoostScore;
        this.LevelName = this.cardArray[arrayPoint].LevelName;
        this.LevelNoWon = this.cardArray[arrayPoint].LevelNoWon;
        this.PointName = this.cardArray[arrayPoint].PointName;
        this.Q1Ans1Act = this.cardArray[arrayPoint].Q1Ans1Act;
        this.Q1Ans2Alt = this.cardArray[arrayPoint].Q1Ans2Alt;
        this.Q1Ans3Alt = this.cardArray[arrayPoint].Q1Ans3Alt;
        this.Q1Ans4Alt = this.cardArray[arrayPoint].Q1Ans4Alt;
        this.Q1Question = this.cardArray[arrayPoint].Q1Question;
        this.Q1TypeId = this.cardArray[arrayPoint].Q1TypeId;
        this.Q2Ans1Act = this.cardArray[arrayPoint].Q2Ans1Act;
        this.Q2Ans2Alt = this.cardArray[arrayPoint].Q2Ans2Alt;
        this.Q2Ans3Alt = this.cardArray[arrayPoint].Q2Ans3Alt;
        this.Q2Ans4Alt = this.cardArray[arrayPoint].Q2Ans4Alt;
        this.Q2Question = this.cardArray[arrayPoint].Q2Question;
        this.Q2TypeId = this.cardArray[arrayPoint].Q2TypeId;
        this.Q3Ans1Act = this.cardArray[arrayPoint].Q3Ans1Act;
        this.Q3Ans2Alt = this.cardArray[arrayPoint].Q3Ans2Alt;
        this.Q3Ans3Alt = this.cardArray[arrayPoint].Q3Ans3Alt;
        this.Q3Ans4Alt = this.cardArray[arrayPoint].Q3Ans4Alt;
        this.Q3Question = this.cardArray[arrayPoint].Q3Question;
        this.Q3TypeId = this.cardArray[arrayPoint].Q3TypeId;
        this.Score = this.cardArray[arrayPoint].Score;
        this.ScoreVerify = this.cardArray[arrayPoint].ScoreVerify;
        this.SectionId = this.cardArray[arrayPoint].SectionId;
        this.S1Statement = this.cardArray[arrayPoint].S1Statement;
        this.S2Statement = this.cardArray[arrayPoint].S2Statement;
        this.ToVerify = this.cardArray[arrayPoint].ToVerify;

        // Load the next item.
        var nextStatement = this.calcNextStatement(0);

        var nextQuestion = this.calcNextQuestion(0);
        // Show intro statement the first time only.  Otherwise, ask a question.
        if (this.CountAsked == 0 && nextStatement > 0) {
            this.cardStatus = "Intro Statement";
        }
        // Expect at least either one statement or one question exist per point.
        // If no questions exist, then CountAsked = 0, and nextStatement > 0.
        else {
            this.cardStatus = "Play Question";
        }

        this.answerGiven = "";
        this.answerGivenLetter = "";
        this.answerLetter = "A";
        this.award = "";
        this.cardType = "Multiple Choice";
        this.progressPct = 0;
        this.sectionImprovePct = 0;
        this.statementIntro = this.S1Statement; // This is only shown once, and is always S1.
        this.tenSetNo = 1;      // For now...
        this.title = 'MindPup Playful Learning';
    }
    // Load a new trail image.
    loadTrail(): void {
        // Load this only once per section, not every 10set...
        var trailNo = this.randomIntFromInterval(1, 9);
        this.trailImage = "images/trail-00" + trailNo + ".png";
     }
    // Change the card status based on the action just taken.
    moveOn(): void {

        switch (this.cardStatus) {
            case 'Not Started':
                this.cardStatus = "Intro Statement";
                this.phase = "Play";
                this.loadCards(1);
                this.loadNextPoint();
                break;
            case 'Intro Statement':
                if (this.hasQuestions == 1) {
                    this.cardStatus = "Play Question";
                    this.cardType = "Multiple Choice";   // Temporary.
                } else {
                    this.loadNextPoint();
                }
                break;
            case 'Play Question':
                this.answerGivenLetter = "";
                break;
            case 'Seen Correct':
                this.loadNextPoint();
                break;
            case 'Seen Incorrect':
                if (this.hasStatements == 1) {
                    this.cardStatus = "Review Statement";
                    this.loadReviewStatement();
                } else {
                    // Even if there is only one question, it will "double" as a review question.
                    this.cardStatus = "Play Question";
                    this.loadReviewQuestion();
                }
                break;
            case 'Review Statement':
                this.cardStatus = "Play Question";
                // When we have a review statement, there must be questions,
                // because if there are no questions on a point, we only have intro statements.
                // However, it is possible that there is only one question, so it might be a repeat.
                this.loadReviewQuestion();
                break;
        }
    }
    // Swaps trail images when restarting.
    ngOnInit(): void {
        this.tenSetNo = 1;
        this.loadTrail();
    }
    // Set up, but not currently used.
    onCardTypeChange(): void {
        // Not currently used.
        switch (this.cardTypeNo) {
            case 0:
                this.cardType = "Fill In";
                break;
            case 1:
                this.cardType = "Multiple Choice";
                break;
            case 2:
                this.cardType = "Fill In";
                break;
            case 3:
                this.cardType = "Fill In Swappable";
                break;
            case 4:
                this.cardType = "True False";
                break;
        };
    }
    // Resets everything, to start over.
    onRestart(): void {
        // Restarts from the beginning, for convenience.

        this.clearCardArray();
        this.clearLocalVariables();
        this.loadTrail();
    }
    // Processes a section when it reaches completion.
    onSectionComplete(): void {
        // Score, display score info, and move on to the next section. 
        this.phase = "Complete";

        this.sectionScore = this.scoreSection();

        if (this.sectionScore == 100) {
            this.award = "100";
        }
        else if (this.sectionScore >= 90) {
            this.award = "90";
        }
        else if (this.sectionScore >= 80) {
            this.award = "80";
        }
    }
    // Processes a 10set when it reaches completion.
    on10setComplete(): void {
        this.tenSetNo++;

        if (this.tenSetNo == 2) {
            this.loadCards(this.tenSetNo);
            this.loadNextPoint();
        }
        if (this.tenSetNo == 3) {
            this.cardStatus == "Complete";
            this.onSectionComplete();
        }
    }
    // Want to move this to Utilities.
    randomIntFromInterval(min, max): number {
        // Get a random number between min and max.
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    // Score a 10set which may be the same as or less than a section.
    score10Set(): number {
        // Score a 10set, or as much as we have in memory
        // after completing the "Play" phase, before entering the "Verify" phase.
        var i = 0;
        this.tenSetAsked = 0;
        this.tenSetCorrect = 0;

        for (let card of this.cardArray) {
            this.tenSetAsked++;
            if (this.cardArray[i].IsCorrect == 1) {
                this.tenSetCorrect++;
            }
            i++;
        }

        return +(((100 * this.tenSetCorrect) / this.tenSetAsked).toFixed(0));
    }
    // Score a section, which may be the same as or more than a 10set.
    scoreSection(): number {
        // Score and prepare a section.
        // Run when "Complete" status reached.
        var i = 0;
        var secScore = 0;
        var totalCorrect = 0;
        var totalPointsPlayed = 0;

        for (let card of this.cardArray) {
            totalPointsPlayed++;
            if (this.cardArray[i].IsCorrect == 1) {
                totalCorrect++;
            }
            i++;
        }

        if (totalPointsPlayed > 0) {
            secScore = +(((100 * totalCorrect) / totalPointsPlayed).toFixed(0));
        }
        return secScore;
    }
    // Chooses A, B, C or D in multiple choice.
    selectAnswer(ansLetter): void {
        // Don't process unless playing a question.
        if (this.cardStatus != "Play Question")
        {
            return;
        }

        // Process after an answer is selected. 
        if (this.phase == "Play") {
            this.CountAsked++;
        }
        else if (this.phase == "Verify") {
            this.CountAskedVerify++;
        }

        switch (ansLetter) {
            case 'A':
                this.answerGivenLetter = 'A';

                // For now, for simplicity, set 'A' as the correct answer all the time.
                this.cardStatus = "Seen Correct";

                if (this.phase == "Play") {
                    this.CountRight++;
                }
                else {
                    this.CountRightVerify++;
                }
                break;
            case 'B':
                this.answerGivenLetter = 'B';
                this.cardStatus = "Seen Incorrect";
                break;
            case 'C':
                this.answerGivenLetter = 'C';
                this.cardStatus = "Seen Incorrect";
                break;
            case 'D':
                this.answerGivenLetter = 'D';
                this.cardStatus = "Seen Incorrect";
                break;
        }

        if (this.phase == "Play") {
            // When answered correctly on the first try, mark as "Correct".
            if (this.CountAsked == 1 && this.CountRight == 1) {
                this.IsCorrect = 1;
            }
            // .toFixed(0) converts number to string, causing an error.
            // +(string) converts back to number.
            this.Score = +((100 * (this.CountRight / this.CountAsked)).toFixed(0));

            // Any score of 66 or above passes.
            if (this.Score >= 66) {
                this.IsPassed = 1; // Passed.
                // Move the progress forward if we passed this point.
                if (this.pointNo > this.pointNoLastPassed) {
                    this.pointNoLastPassed = this.pointNo;
                }
                // Update progress percent.

            }
        }
        else    // Verify score.
        {
            this.ScoreVerify = +((100 * (this.CountRightVerify / this.CountAskedVerify)).toFixed(0));

            // There is no concept of "Correct" in the verify phase.

            if (this.ScoreVerify >= 66) {
                this.IsVerified = 1; // Verified.
                // Move the progress forward if we passed this point.
                this.pointNoLastPassed = this.pointNo;
            }
        }

        // See if we're reviewing a point right now.
        if (this.pointNoLastPassed == this.pointNo || this.phase == 'Verify') {
            this.IsReview = 0;
        }
        else {
            this.IsReview = 1;
        }

        // Store the results.
        this.cardArray[this.pointNoArray].CountAsked = this.CountAsked;
        this.cardArray[this.pointNoArray].CountAskedVerify = this.CountAskedVerify;
        this.cardArray[this.pointNoArray].CountRight = this.CountRight;
        this.cardArray[this.pointNoArray].CountRightVerify = this.CountRightVerify;
        this.cardArray[this.pointNoArray].IsCorrect = this.IsCorrect;
        this.cardArray[this.pointNoArray].IsPassed = this.IsPassed;
        this.cardArray[this.pointNoArray].IsVerified = this.IsVerified;
        this.cardArray[this.pointNoArray].Score = this.Score;
        this.cardArray[this.pointNoArray].ScoreVerify = this.ScoreVerify;
    }
}  // End PlayComponent
















