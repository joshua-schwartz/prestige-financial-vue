import axios from 'axios'

export interface ITimeSeriesDataItem {
  date: string,
  open: string | number,
  high: string | number,
  low: string | number,
  close: string | number,
  volume: string | number,
}

export async function getTimeSeries(stockName: string): Promise<ITimeSeriesDataItem[] | undefined> {
  try {
    // get the data from endpoint
    const { data } = await axios.get(`http://jon.allocate.build/${stockName.toLowerCase()}.json`)

    if (data !== undefined) {
      // restructure the raw return data to fit our needs
      return formatTimeSeries(data['Monthly Time Series'])
    }

    return data
  } catch (error) {
    console.error(error.toJSON())
  }
}

function formatTimeSeries(timeSeriesRaw: any): ITimeSeriesDataItem[] {
  const formattedEntries: ITimeSeriesDataItem[] = []

  Object.entries(timeSeriesRaw).forEach(([key, value]) => {
    const timeSeriesItem = formatTimeSeriesItem(key, value)
    formattedEntries.push(timeSeriesItem)
  })

  return formattedEntries.toSorted((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
}

function formatTimeSeriesItem(key: string, value: any): ITimeSeriesDataItem {
  return {
    date: key,
    open: getValueForFuzzyKey(value, 'open'),
    high: getValueForFuzzyKey(value, 'high'),
    low: getValueForFuzzyKey(value, 'low'),
    close: getValueForFuzzyKey(value, 'close'),
    volume: getValueForFuzzyKey(value, 'volume'),
  }
}

function getValueForFuzzyKey(obj: any, keyHint: string): any {
  /* The object keys don't match the interface signature.
    - One option would be to change the interface to match the key values, but that's brittle (especially because this isn't an endpoint we control internally)
    - Another option would be to trim the key strings down to the substring we need, but that's also prone to quietly failing if the owner of the endpoint changes something slightly
    - Third option would be blindly matching the indexes, but again, if they change the order it would start outputting values in the wrong columns and be hard to notice
    - Chose to instead do a fuzzy match on the key substrings from our interface, this is a bit more forgiving if the key names change slightly and gives us a louder failure if no match is found
  */

  for (const key of Object.keys(obj)) {
    if (key.includes(keyHint)) {
      return obj[key]
    }
  }
  return undefined
}
