#!/usr/bin/env node
/* Write interface for dictionary
 * The keys are company names, the values RSS feed URLs
 * If the company has more than one RSS feed, the value will need to be an array or map.  Need to ask customer if this is always the case, or code for multiple cases
 * Leave values as <any> for now
*/
interface IDictionary<T> {
    key<string>: string | Array<string> | Array <[string, string]> | object | any;
}

/**
 * Write function that takes a dictionary and a number (x) and returns a list.
 * The dictionary will follow the above interface
 * The number will represent a number of days
 * Find the current date
 * subtract x days to find the date in question
 * for each url, go to the url and parse the rss to find the ones that occured on or after that date
 * questions:
 * do the rss feed items always have dates?
 * if so, do as stated above
 * if not, some type of database will be needed with a timestamp.  This is not ideal.
 * if the rss feed has one or more item that has been added after the date, push company name to an array.
 * Question: what is the desired output type?  Assumption is an array of strings
 * 
 * 
 */

