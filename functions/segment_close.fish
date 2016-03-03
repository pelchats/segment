function segment_close
    if test -z "$segment"
        set_color normal
    else
        echo -e "$segment "
        set segment
        set segment_color
    end
end
