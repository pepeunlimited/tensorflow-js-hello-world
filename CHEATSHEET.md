# Cheat sheet

### Live

Activate the conda environment:
```
$ conda activate hummingbot
```

install `pandas-ta`
```
$ pip install -U git+https://github.com/twopirllc/pandas-ta.git@development
```

logs

```
$ tail -f ~/github/hummingbot/logs/logs_hft_v1.log
```

### Backtest

macos install `coreutils`
```
$ brew install coreutils 
```

cheatsheet for `date` or `gdate`
```
$ curl cht.sh/date
```

date to seconds
```
$ gdate -d "2023-08-07 06:00" +%s --utc
```

milliseconds to date
```
$ gdate -d @$(((1692210600000 + 500)/1000)) --utc
```

Root folder contain `backtest` folder which holds data for backtesting.

Download `k-lines`:
```
$ curl "https://api.binance.com/api/v3/klines?startTime=1691503200000&endTime=16915212000000&interval=3m&symbol=BTCUSDT&limit=200" -o ~/github/hummingbot/backtest/data/binance-klines.json
```

Epoch time converter  
[`epoch`](https://www.epochconverter.com/)  

### Unittest

Run single unit test. `NOTICE`: must be executed at root dir
```
$ python -m unittest -f -v test/hummingbot/strategy/test_script_strategy_hft_v1.py
```