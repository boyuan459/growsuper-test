import _ from "lodash";
import { createSelector } from "reselect";

export const getHomeLoansData = state => _.get(state, "homeLoans", {});

export const getHomeLoans = createSelector([getHomeLoansData], homeLoans => {
    return homeLoans.get("loans").toArray();
});

export const getHomeLoansLoading = createSelector([getHomeLoansData], homeLoans => {
    return homeLoans.get("loading");
});

export const getHomeLoansTotalCount = createSelector([getHomeLoansData], homeLoans => {
    return homeLoans.get("totalCount");
});

export const getHomeLoansTotalPage = createSelector([getHomeLoansData], homeLoans => {
    return homeLoans.get("totalPage");
});

export const getHomeLoansPage = createSelector([getHomeLoansData], homeLoans => {
    return homeLoans.get("page");
});