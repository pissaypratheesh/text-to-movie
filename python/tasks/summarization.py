import sys
import logging

from typing import Dict
import autogen
import time
from autogen.agentchat.contrib.teachable_agent import TeachableAgent
from openai import AzureOpenAI
from autogen import UserProxyAgent
from tasks.numeric_hash import create_numeric_hash
def run_summarization_flow( prompt: str, id: str = None, title: str = None) -> None:
    config_list = [
        {
            'model': 'GPT4',
            'api_key': '8778e5ede6014d8a83b385c908149b12',
            'base_url' : 'https://dh-prod-openai.openai.azure.com/',
            'api_type': 'azure',
            'api_version': '2023-07-01-preview',
        }
    ]
    numeric_hash = create_numeric_hash(prompt)
    print("\n\n\n🚀 ~ file: summarization.py:22 ~ numeric_hash:", numeric_hash,prompt)

    start_time = time.time()
    assistant = autogen.AssistantAgent(
        name="assistant",
        system_message="""You are a helpful AI assistant who is an expert in text summarization with emoticons in a little funny way with genZ lingo to make it kickass.
            You don't miss out any details.
            You should not make up any sentences.
            You should give a kickass 5 titles to the summary.
            You will always return as JSON with the following format:
            `{
                "summary": "summary here has to be around 80 to 120 words",
                "titles": ["title 1", "title 2", "title 3", "title 4", "title 5"],
            }`
            The summary part of the json should be around 120 words and less than that if only the given text itself is less.  
            Don't create or execute any code.
            And exit chat with "TERMINATE"
        """,
        llm_config={
            "seed": numeric_hash,  # seed for caching and reproducibility
            "config_list": config_list,  # a list of OpenAI API configurations
            "temperature": 0.5,  # temperature for sampling
        },  # configuration for autogen's enhanced inference API which is compatible with OpenAI API
    )
    # create a UserProxyAgent instance named "user_proxy"
    user_proxy = autogen.UserProxyAgent(
        name="user_proxy",
        human_input_mode="NEVER",
        system_message="""Your job is the verify the summarization of the text for any errors and only return the JSON provided without any malformation. 
        Also check that in json, summary has to be around 80 to 120 words """,
        max_consecutive_auto_reply=3,
        is_termination_msg=lambda x: x.get("content", "").rstrip().endswith("TERMINATE"),
    )
    # the assistant receives a message from the user_proxy, which contains the task description
    user_proxy.initiate_chat(
        assistant,
        message=prompt.replace("/summarize ", ''),
    )
    messages = user_proxy.chat_messages[assistant]
    print("\n\n\n\nmsgs:",messages)
    response = {
        "messages": messages[1:],
        "duration": time.time() - start_time,
    }
    return response 
