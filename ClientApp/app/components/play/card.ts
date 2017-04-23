/********************************* 
 CARD
 ====
 A "card" is information about one point being played.
 It contains:
 - Point fields
 - Play Point fields 
 - Play Section
 - Level Scoring (calculated)
**********************************/
export class Card {
    PlayTenSetId: number;               /* Play Point */
    /* Key identifying this 10set. 
       This recordset is usually 10 points, but can be less than 10 if:
       
       1. There are less than 10 points in this section.
       2. This 10set spans a section, and ends a section.
       3. This 10set spans a section, and it begins a section.
       4. This 10set ends a section, and includes 
          50set or 100set verification points.         */
    PointId: number;                    /* Play Point */
    /* Key identifying this point. Points are part of 10sets. 
       This record identifies a unique point. */
    IsCorrect: number;
    /* IsCorrect = 1 indicates the point (not just the question) was answered right 
                     on the FIRST TRY.  The magnitude of verification required,
       and the percentages for scoring are based on this value. */
    LevelAward: number;                 /* Calced - Play Levels */
    /* 1 = 100% Diamond
       2 =  90% Emerald
       3 =  80% Ruby         */
    LevelAwardScore: number;            /* Calced - Play Levels */
    /* Absolute score for this level used in determining the award graphic. */
    LevelBoost: number;                 /* Calced - Play Levels */
    /* 1 = 30% 2 thumbs up
       2 = 10% 1 thumb  up   */
    LevelBoostScore: number;            /* Calced - Play Levels */
    /* Improvement percent for this level used in determining boost graphic. */
    LevelImage: number;
    /* Images for trails, etc. are assigned randomly during play,
       and are saved with an integer ID.
       They need to be retrieved when showing the results of the level
       being won. */
    LevelName: string;               /* Calced - Play Levels */
    /* The name of the level being played and/or won. 
       This name is what the player gave it when she created it,
       along with the type of level, i.e. trail, hill, etc. */
    LevelNoWon: number;                 /* Calced - Play Levels */
    /* The heirarchical number of the level being won.
       For example, level 1 (lowest - trail), 2 (hill), etc.
       If LevelNoWon = 0, then we're not showing the winning of 
       this level.  If LevelNoWon > 0, we're not playing any points,
       but rather showing the results of this portion of play. */
    PlayId: number;                     /* Play Point */
    /* A "play" is the intersection of a player and a game.
       A user is a player.  A game is a selection of points at a 
       certain heirarchical level.  For example, you can have a game
       by only selecting a trail, or a hill, or on up to a summit.
       No matter how high up the defined hierarchy you go, what you 
       select to play is called a "game", and an ID is assigned to that activity,
       which is a PlayId.  You are always playing a game.  */
    PlayerName: string;                 /* Users */
    /* Full name of logged in user.  Users can be conceived as having two
       distinct roles:  A player and a creator.  Anyone in this play module
       is a "player", and they are playing a "game". */
    PointName: string;                  /* Point */
    /* User defined name of this point. */
    Q1Ans1Act: string;                  /* Point */
    /* This is the actual answer to the first question,thus the name "Act".
       Multiple choice answers are randomized when they get to the client,
       but are passed in with the actual answer always in the first position. */
    Q1Ans2Alt: string;                  /* Point */
    /* Answer #2, which is an incorrect answer,
       thus it is designated as "alternate" or "Alt". */
    Q1Ans3Alt: string;                  /* Point */
    /* Answer #3, also incorrect, and alternate. */
    Q1Ans4Alt: string;                  /* Point */
    /* Answer #4, also incorrect, and alternate. */
    Q1Question: string;                 /* Point */
    /* The first question. */
    Q1TypeId: number;                   /* Point */
    /* The type of the first question. 
        1   Multiple Choice     4 Alternatives - 1st correct, randomized in client
        2   Fill In             Answer typed in. - 1st answer is the answer
        3   Fill In Swappable   Same as fill in, but question and answer can be
                                swapped in the client
        4   True False          Like multiple choice, but with these choices:
                                a. True
                                b. False
                                c. Mostly True
                                d. Mostly False
                                Whichever of these is correct will have "True"
                                entered in the answer 1 through 4.  The others
                                will be blank.    */
    Q2Ans1Act: string;                  /* Point */
    /* Question #2 is exactly like Question #1, used as the first alternate
       when initially answered incorrectly, but also cycled when needed,
       so that questions get posed in order:  1, 2, 3, 1, 2, 3... */
    Q2Ans2Alt: string;                  /* Point */
    Q2Ans3Alt: string;                  /* Point */
    Q2Ans4Alt: string;                  /* Point */
    Q2Question: string;                 /* Point */
    Q2TypeId: number;                   /* Point */
    Q3Ans1Act: string;                  /* Point */
    /* Question #3 is also exactly like Question #1.  It gets asked later in the 
       sequence if Question #1 was intitially answered incorrectly, and also
       gets cycled so that questions are posed in order. */
    Q3Ans2Alt: string;                  /* Point */
    Q3Ans3Alt: string;                  /* Point */
    Q3Ans4Alt: string;                  /* Point */
    Q3Question: string;                 /* Point */
    Q3TypeId: number;                   /* Point */
    SectionId: number;                  /* Play Sections */
    /* The current SectionId.  Sections hold Points.
       All the different levels are recorded in Sections,
       so the smallest game one can play has at least one Section in it. */
    S1Statement: string;                /* Point */
    /* The introductory and basic statement.  Statements, like questions, cycle.
       If questions are wrong and require re-statement, this goes in order,
       statement 1, 2, 1, 2, etc. */
    S2Statement: string;                /* Point */       
    /* The review statement. It also cycles with Statement 1. */
    ToVerify: number;                   /* Play Point */
    /* Usually, new 10sets (including partial 10sets that either begin or
       end a section) are served by the database.  However, at times 
       points are served as part of a 50set or 100set review.
       In these cases, ToVerify will already be marked true.
       These are played before additional forward motion occurs on the 10set. */
}

