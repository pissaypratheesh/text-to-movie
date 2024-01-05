# text-to-movie
Fetch videos by query
http://localhost:3000/api/fetchshorts?query=elephant%20and%20turtle




# steps to run python fast api server
/Users/pratheesh.pm/miniconda3/envs/autogen/bin/python -m uvicorn app:app --reload --port 8081


Video creation is in nodejs/others folder
and nodejs/xml_generator/refactored/jsonGenerator.js


1. have a button just above the editor by name Update, on clicking which update the jsonData state with the edited changes in the editor







//main work
1. fetch playlist
2. select video
3. subtitle summary //API done,
4. script creation //Api done,
5. tts and stt creation 
6. stt segmentation 
7. each segment asset creation //Done
8. video clip identification in video //Done
9. json generation and xml creation 
10. burn
11. Video screenshot creator for a given time
    
    

 Present integration:
 1. summary creation   






Youtube related:
https://github.com/alexmercerind/youtube-search-python

/*
Background musics:
https://www.youtube.com/watch?v=i-rJ_M7yEgI&list=PLRPR8uJQx5tFKiCDod3PjQf3f5_PiUEPU&index=6
*/

/*
    AUdio mix command:
    `ffmpeg -i public/assets/tts/Fbbu_GQcrwc/Fbbu_GQcrwc.mp3 -i public/assets/audio/bg/ads.mp3 -filter_complex "[0:a]volume=1[a1];[1:a]volume=0.3[a2];[a1][a2]amix=inputs=2" -c:a mp3 output.mp3`

    Explanation:

    -i public/assets/tts/Fbbu_GQcrwc/Fbbu_GQcrwc.mp3: Specifies the first input audio file.

    -i public/assets/audio/bg/ads.mp3: Specifies the second input audio file.

    -filter_complex "[0:a]volume=1[a1];[1:a]volume=0.3[a2];[a1][a2]amix=inputs=2": Applies the volume filter to set the volume of each input file (volume=1 for the first file and volume=0.3 for the second file). Then, it uses the amix filter to mix the two audio streams.

    -c:a mp3: Specifies the output audio codec as MP3.

    output.mp3: Specifies the output file name.

*/


/*
 Remove silence in the start: 
 ffmpeg -i disco.mp3 -af "silenceremove=start_periods=1:start_duration=1:start_threshold=-50dB" -c:a mp3 output.mp3

 -af "silenceremove=start_periods=1:start_duration=1:start_threshold=-50dB": Applies the silenceremove filter to remove silence at the beginning of the audio. The parameters are set to start removing silence after 1 period of silence with a duration of 1 second and a threshold of -50dB. Adjust these parameters based on your specific requirements.

-c:a mp3: Specifies the output audio codec as MP3.

output.mp3: Specifies the output file name.
*/
