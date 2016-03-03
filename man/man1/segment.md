segment(1) -- Powerline prompt builder
======================================

## SYNOPSIS

`segment` *text* *color* *background color* [*prefix*]<br>
`segment_right` *text* *color* *background color* [*prefix*]<br>
`segment_close`<br>

## DESCRIPTION

**Segment** is a fish library to build powerline prompts.

## USAGE

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

## OPTIONS

* text:
    Set the text to display in the segment.

* color:
    Set the text color.

* background:
    Set the background color.

* prefix:
    Optional text to display in front of the segment delimiter.
