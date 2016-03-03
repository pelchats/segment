function segment -a text color background prefix -d "Add prompt segment"
    if test -z "$segment_color"
        set segment_color normal
    end

    set -g segment (echo (set_color $color -b $background)"$text"(
        set_color $background -b $segment_color)"$prefix")"$segment"

    set -g segment_color $background
end
