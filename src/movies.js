// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    return moviesArray.map((element) => element.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    return moviesArray.filter((element) => element.genre.includes("Drama") && element.director === "Steven Spielberg").length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (moviesArray.length === 0) {
        return 0;
    } else {
        return Math.round((moviesArray.reduce((acc, curr) => (curr.score ? acc + curr.score : acc), 0) / moviesArray.length) * 100) / 100;
    }
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    return scoresAverage(moviesArray.filter((element) => element.genre.includes("Drama")));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    return moviesArray.toSorted((movie2, movie1) => {
        const cmp = movie2.year - movie1.year;
        return cmp === 0 ? movie2.title.localeCompare(movie1.title) : cmp;
    });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    return moviesArray
        .map((e) => e.title)
        .toSorted((movieTitle2, movieTitle1) => movieTitle2.localeCompare(movieTitle1))
        .slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    return moviesArray.map((movie) => {
        const durationMin = movie.duration.split(" ").reduce((acc, curr) => {
            if (curr.includes("h")) {
                return acc + parseInt(curr) * 60;
            } else if (curr.includes("min")) {
                return acc + parseInt(curr);
            }
        }, 0);
        return { ...movie, duration: durationMin };
    });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    // if (moviesArray.length === 0) {
    //     return null;
    // } else {
    //     let scoreByYear = {};
    //     moviesArray.forEach((movie) => {
    //         if (!scoreByYear[movie.year]) {
    //             scoreByYear[movie.year] = [movie.score];
    //         } else {
    //             scoreByYear[movie.year].push(movie.score);
    //         }
    //     });
    //     let scoreByYearArray = [];
    //     for (year in scoreByYear) {
    //         const avg = scoreByYear[year].reduce((acc, curr) => acc + curr, 0) / scoreByYear[year].length;
    //         scoreByYearArray.push({ year: year, score: avg });
    //     }
    //     scoreByYearArray.sort((year2, year1) => {
    //         return year2.score - year1.score === 0 ? year1.year - year2.year : year2.score - year1.score;
    //     });
    //     let bestYear = scoreByYearArray.pop();
    //     return `The best year was ${bestYear.year} with an average score of ${bestYear.score}`;
    // }
    
    if (moviesArray.length === 0) {
        return null;
    } else {
        const scoresByYearObject = moviesArray.reduce((acc, curr) => {
            if (!acc[curr.year]) {
                acc[curr.year] = [curr.score];
            } else {
                acc[curr.year].push(curr.score);
            }
            return acc;
        }, {});
        const scoresByYearArray = Object.entries(scoresByYearObject).map((element) => {
            let avg =
                element[1].reduce((acc, curr) => {
                    return acc + curr;
                }, 0) / element[1].length;
            element[1] = avg;
            return element;
        });

        const scoresByYearObjectsArray = scoresByYearArray.map(([key, value]) => { return { year: key, score: value } });
        scoresByYearObjectsArray.sort((year2, year1) => (year2.score === year1.score) ? year1.year - year2.year : year2.score - year1.score);
        
        const bestYear = scoresByYearObjectsArray.pop();
        return `The best year was ${bestYear.year} with an average score of ${bestYear.score}`;
    }
}
