import moment from "moment";
import numeral from "numeral";

export const integerFormatter = item => numeral(item).format("0,0");

export const floatFormatter = item => numeral(item).format("0.000");

export const percentageFormatter = item => numeral(item).format("0.000%");

export const dateFormatter = item => moment(item).format("DD MMM");

export const hourFormatter = item => moment(item).format("HH:00");