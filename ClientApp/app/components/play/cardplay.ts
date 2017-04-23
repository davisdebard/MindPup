/********************************* 
 CARDPLAY
 ========
 A "card play" is "working"" information about one point being played.
 It contains:
 - Card
 - Temporary fields used for scoring, etc.
**********************************/
export class CardPlay {
    /* These fields come from the Card class. */
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
    
    /* These fields are temporary, used in calculations. */
    PointNo: number;
    /* Sequential number for this 10set.  i.e. 1, 2, ... 10. 
       NOTE: This is NOT the same as PointId, which is permanent. */
    CountAsked: number;
    /* How many times this point has been asked in the play phase of this 10set. */
    CountAskedVerify: number;
    /* How many times this point has been asked in the optional verify phase of this 10set. */
    CountRight: number;
    /* How many times this point has been asked correctly in the play phase of this 10set. 
       NOTE: If CountAsked = 1 and CountRight = 1, then IsCorrect = 1.  
             CountRight > 1 is used in scoring. */
    CountRightVerify: number;
     /* How many times this point has been asked correctly in the optional verify phase of this 10set. 
       NOTE: There is no concept of IsCorrect for Verify, as this is a type of review. */
    IsPassed: number; 
    /* IsPassed = 1 if this point has been passed in the play phase. */                    
    IsReview: number; 
    /* IsReview = 1 if this point has been previously played. Used to display a Review status
       to the player. */                    
    IsVerified: number;
    /* IsVerified = 1 once the point has been verified, so that it won't be referenced again
       when searching for points to verify.  Used in conjunction with ToVerify flag. */
    Score: number;
    /* The score for the play phase.  Score = 100 * (CountRight / CountAsked). */
    ScoreVerify: number;
    /* The score for the verify phase.  Score = 100 * (CountRightVerify / CountAskedVerify). */
}

