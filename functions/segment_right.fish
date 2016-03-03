function segment_right -a text color background prefix -d "Add right prompt segment"
    set -l right_color $segment_right_color

    if test -z "$right_color"
        set right_color $background
    end

    set -g segment_right_color $color

    echo "$prefix"(set_color $background)(set_color $segment_right_color -b $background
        )"$text"(set_color $right_color)
end
