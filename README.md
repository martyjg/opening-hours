# opening-hours

## Install and run
```
pnpm install
pnpm dev
```

## What is this?
This is an app for displaying opening times for a business.
- It takes data in this format:
```
{
	"tuesday": [
		{
			type:  "open",
			value:  61200
		}
	],
	"wednesday": [
		{
			type: "close".
			value: 100
		}
	]
}
```
where `value` is the time in seconds since midnight.

- Renders the values in a scheduled 12-hour clock format for each day.
- The schedule will also indicate which is the current day with 'Today'.
- The rendered markup uses `<time datetime='' />` for SEO purposes.
