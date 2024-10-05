
multiple_cmd() { 
    # Add title description
    perl -i -0777 -pe 's/<!DOCTYPE(.*|\n)*<html>/---\ntitle: The Institute for Ethical AI & Machine Learning\ndescription: The Institute for Ethical AI & Machine Learning is a Europe-based research centre that brings togethers technologists, academics and policy-makers to develop industry frameworks that support the responsible development, design and operation of machine learning systems.\n---\n<html>/g' $1

    # Replace header for partial
    perl -i -0777 -pe 's/<title>(.*|\n)*itemprop="image.*>/{% include header.html %}/g' $1

    # Replace navbar for partial
    perl -i -0777 -pe 's/<!-- Header(.*|\n)*<\/nav>\s*<\/header>/{% include navbar.html %}/g' $1

    # Remove scripts repeated in all newsletter pages twice
    perl -i -0777 -pe 's/<!-- Scripts(.*|\n)*main.js"><\/script>//g' $1

    # Remove scripts from header for all files
    perl -i -0777 -pe 's/<script(.*|\n)*main.js"><\/script>//g' $1

    # Replace footer with partial
    perl -i -0777 -pe 's/<!-- Footer(.*|\n)*<\/script>/{% include footer.html %}/g' $1

    # Remove all dos newlines to linux
    perl -i -pe 'tr/(\r|\n)+/\n/' $1
}
export -f multiple_cmd

find . -path "./_*" -prune -o -name "*.html" -exec bash -c 'multiple_cmd "$0"' {} \;


