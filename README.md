[![Build Status][travis-badge]][travis-link]
[![Slack Room][slack-badge]][slack-link]

# Segment

**Segment** is a fish library to build powerline prompts.

## Usage

Call segment once to add one segment to the left prompt and segment_right to add one segment to the right prompt. Call segment_close after you have built the entire prompt.

The left prompt is built from *right* to *left*. In the following example, BASE is displayed first on the left, and FRONT on the right.

```fish
function fish_prompt
    segment FRONT white red
    segment BASE black white
    segment_close
end
```

```fish
function fish_right_prompt
    segment_right FRONT white red
    segment_right BASE black white
    segment_close
end
```

The right prompt is built from *left* to *right*. In the example above, BASE is displayed last on the right, and FRONT on the left.

<p align=center>
<img width="660" src="https://cloud.githubusercontent.com/assets/8317250/13500727/18739ef6-e1a7-11e5-8494-30a6dc6c734b.png"></p>

## Options

* text<br>
    Set the text to display in the segment.

* color<br>
    Set the text color.

* background<br>
    Set the background color.

* prefix<br>
    Optional text to display in front of the segment delimiter.


[travis-link]: https://travis-ci.org/fishery/segment
[travis-badge]: https://img.shields.io/travis/fishery/segment.svg?style=flat-square
[slack-link]: https://fisherman-wharf.herokuapp.com/
[slack-badge]: https://img.shields.io/badge/slack-join%20the%20chat-00B9FF.svg?style=flat-square
[fisherman]: https://github.com/fisherman/fisherman
[lack-of-wait]: https://github.com/fish-shell/fish-shell/issues/1422
