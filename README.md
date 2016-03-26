[![Slack Room][slack-badge]][slack-link]

# Segment

Segment is a fish library to build powerline prompts.

## Usage

Call segment / segment_right to create a powerline segment. Call segment_close after you have added all the prompt segments.

```fish
function fish_prompt
    segment white red FRONT
    segment black white BASE
    segment_close
end

function fish_right_prompt
    segment_right white red FRONT
    segment_right black white BASE
    segment_close
end
```

![Example](https://cloud.githubusercontent.com/assets/8317250/13501135/d0ccc7ec-e1a8-11e5-8bd1-e14b8b40242e.png)

## Options

* *foreground*: Set the text foreground color.

* *background*: Set the text background color.

* [*text*]: Set the text to display.

## Notes

* The left prompt is built from *right* to left.
* The right prompt is built from *left* to right.

[slack-link]: https://fisherman-wharf.herokuapp.com/
[slack-badge]: https://img.shields.io/badge/slack-join%20the%20chat-00B9FF.svg?style=flat-square
[fisherman]: https://github.com/fisherman/fisherman
